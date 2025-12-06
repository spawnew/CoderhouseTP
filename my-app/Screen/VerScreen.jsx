import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button ,Image} from 'react-native';
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
      <FlatList 
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}> 
            <View style={styles.card}> 
            <Text >Nombre🐾 {item.name}</Text>
            <Text >Tipo: {item.tipo}</Text>
            <Text >Color: {item.color}</Text>
              
              <Text >Ubicación: {item.foto}</Text>
            </View>
            <Button
              title="Ver en mapa"
              onPress={() => {
                const [lat, lon] = item.foto?.split(',') || [null, null];
                if (lat && lon) {
                  setSelectedLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
                }
              }}
              color="#073d1eff"
            />
          </View>
        )}
      />

      {selectedLocation && <MapPreview location={selectedLocation} />}

      <Button 
        title="Ir a Home 🐾"
        onPress={() => navigation.navigate("Main")}
        color="#054172ff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    
   
    padding: 10,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#edf0eeff',
    flexWrap: "wrap",

    alignContent: 'center',
    flexDirection: "column",
    
    
  },

  itemContainer: {

    flexDirection: "row",
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
});