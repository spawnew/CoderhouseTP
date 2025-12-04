import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPets } from '../redux/slices/petsSlice';
import { useSQLiteContext } from 'expo-sqlite';

export default function VerScreen() {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  const { pets } = useSelector(state => state.pets);
  const [loading, setLoading] = useState(true);

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
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>🐾 {item.name}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Color: {item.color}</Text>
          <Text>Ubicación: {item.direccion}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
    name: { fontSize: 18, fontWeight: 'bold' }
});