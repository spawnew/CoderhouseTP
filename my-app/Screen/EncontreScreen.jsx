import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPets, removePet } from "../redux/slices/petsSlice";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from '@react-navigation/native';
export default function EncontreScreen() {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const { pets } = useSelector(state => state.pets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navigation = useNavigation();
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📱 Cargando mascotas desde SQLite...");
      
      const result = await db.getAllAsync("SELECT * FROM items");
    
      
      dispatch(setPets(result || []));
    } catch (err) {
      console.log("❌ Error al cargar mascotas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (petId) => {
    Alert.alert("fue encontrada ", "¿Estás seguro?", [
      { text: "Cancelar", onPress: () => {} },
      { 
        text: "Eliminar", 
        onPress: async () => {
          try {
            await db.runAsync("DELETE FROM items WHERE id = ?", [petId]);
            dispatch(removePet(petId));
            Alert.alert("Éxito", "Mascota eliminada");
          } catch (err) {
            Alert.alert("Error", "No se pudo eliminar la mascota");
          }
        },
        style: "destructive" 
      }
    ]);
  };

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text >Cargando mascotas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error: {error}</Text>
        <Button title="Reintentar" onPress={loadPets} />
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>🐾 No hay mascotas registradas</Text>
        <Text style={styles.title}>Agrega una mascota desde "Subir"🐾</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Si ya no la estas buscando eliminala de la lista 🐾</Text>
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text >🐾 {item.name}</Text>
          <Text > {item.direccion || "Sin ubicación"}</Text>
          <Text >Tipo: {item.tipo}</Text>
          <Text >Color: {item.color}</Text>

          <Button 
            title="ya la Encontré " 
            color="#1791f5ff"
            onPress={() => handleDelete(item.id)}
          />
        </View>
      )}
  
      refreshing={loading}
      onRefresh={loadPets}
      />
      <Button 
              title="Ir a Home 🐾"
              onPress={() => navigation.navigate("Main")}
        color="#054172ff"
        Styles={{width:"100%"}}
      />
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
   
    padding: 10,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#edf0eeff',
    flexWrap: "wrap",
    alignContent: 'center',
    flexDirection: "column",
  }  ,
     itemContainer: {

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  
   
  },
  card: {
  
    marginRight: 10,
    backgroundColor: '#eededeff',
  },
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 100,
  },
    title: {
       fontWeight: 'bold',
    fontSize: 30,
    }


  
})