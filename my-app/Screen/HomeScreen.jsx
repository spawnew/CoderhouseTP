import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPets, removePet } from "../redux/slices/petsSlice";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const { pets } = useSelector(state => state.pets);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📱 Cargando mascotas desde SQLite...");
      
      const result = await db.getAllAsync("SELECT * FROM items");
      console.log("✅ Mascotas cargadas:", result);
      
      dispatch(setPets(result || []));
    } catch (err) {
      console.log("❌ Error al cargar mascotas:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (petId) => {
    Alert.alert("Eliminar", "¿Estás seguro?", [
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando mascotas...</Text>
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
        <Text style={styles.emptyText}>📭 No hay mascotas registradas</Text>
        <Text style={styles.subText}>Agrega una mascota desde "Subir"</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.name}>🐾 {item.name}</Text>
          <Text style={styles.location}>📍 {item.direccion || "Sin ubicación"}</Text>
          <Text style={styles.tipo}>Tipo: {item.tipo}</Text>
          <Text style={styles.color}>Color: {item.color}</Text>

          <Button 
            title="Eliminar" 
            color="red"
            onPress={() => handleDelete(item.id)}
          />
        </View>
      )}
      contentContainerStyle={styles.listContainer}
      refreshing={loading}
      onRefresh={loadPets}
    />
  );
}



const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
})