import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPets } from '../redux/slices/petsSlice';
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import MapPreview from '../components/MapPreview';

export default function VerScreen() {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const { pets } = useSelector(state => state.pets);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      const result = await db.getAllAsync("SELECT * FROM items");
      console.log("✅ Mascotas cargadas:", result);
      dispatch(setPets(result || []));
    } catch (error) {
      console.log("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMap = (item) => {
    console.log("🗺️ Item:", item);
    
    if (item.latitude && item.longitude) {
      console.log("✅ Coordenadas encontradas - Lat:", item.latitude, "Lon:", item.longitude);
      setSelectedLocation({ 
        latitude: item.latitude, 
        longitude: item.longitude 
      });
    } else {
      Alert.alert('Ubicación no disponible', 'Esta mascota no tiene coordenadas registradas');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay mascotas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedLocation && (
        <View >
          <MapPreview location={selectedLocation} />
          <Button
            title="❌ Cerrar mapa"
            onPress={() => setSelectedLocation(null)}
            color="#FF3B30"
          />
        </View>
      )}

      <FlatList 
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}> 
            {item.foto && item.foto.includes('base64') && (
              <Image 
                source={{ uri: item.foto }} 
                style={styles.petImage}
              />
            )}
            <Text >🐾 {item.name}</Text>
            <Text style={styles.text}>Tipo: {item.tipo}</Text>
            <Text style={styles.text}>Color: {item.color}</Text>
            <Text style={styles.text}>Ubicación: {item.direccion}</Text>
            {item.email && (
              <Text style={styles.text}>📧 Email: {item.email}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="🗺️ Ver en mapa"
                onPress={() => handleViewMap(item)}
                color="#007AFF"
              />
            </View>
          </View>
        )}
      />

      <Button
        title="Ir a Home 🐾"
        onPress={() => navigation.navigate("Main")}
        color="#007AFF"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  padding:10,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#edf0eeff',
    flexWrap: "wrap",

    alignContent: 'center',
    flexDirection: "column",
    
    
  },
 petImage: {
    
   height: 80,
    width:80,
    borderRadius: 8,
    marginBottom: 10
  },
  itemContainer: {
    
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  
   
  },
  card: {
  
    marginRight: 10,
    backgroundColor: '#eededeff',
     title: {
       fontWeight: 'bold',
    fontSize: 15,
    }
  },
});