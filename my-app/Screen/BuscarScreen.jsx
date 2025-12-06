import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import FormScreen from './FormScreen';

const BuscarScreen = () => {
  const [nombre, setNombre] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = useSQLiteContext();

  const obtener = (nombre) => {
    console.log("🔍 Buscando:", nombre);
    setNombre(nombre);
  };

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        let result;

        if (nombre.trim() === "") {
          result = await db.getAllAsync("SELECT * FROM items");
          console.log("✅ Todos los items:", result);
        } else {
          result = await db.getAllAsync(
            "SELECT * FROM items WHERE name LIKE ? OR tipo LIKE ? OR color LIKE ?",
            [`%${nombre}%`, `%${nombre}%`, `%${nombre}%`]
          );
          console.log("✅ Items filtrados por:", nombre, "Resultados:", result);
        }

        setItems(result || []);
      } catch (error) {
        console.log("❌ Error al obtener datos:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [nombre, db]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Buscar Mascota</Text>
      <FormScreen obtener={obtener} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : items.length === 0 ? (
        <Text style={styles.noResults}>
          {nombre ? "No hay resultados" : "Sin mascotas en la base de datos"}
        </Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {item.foto && (
                <Image 
                  source={{ uri: item.foto }} 
                  style={styles.petImage}
                />
              )}
              <Text style={styles.itemText}>🐾 Nombre: {item.name}</Text>
              <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
              <Text style={styles.itemText}>Color: {item.color}</Text>
              <Text style={styles.itemText}>Ubicación: {item.direccion}</Text>
              {item.email && (
                <Text style={styles.itemText}>📧 Email: {item.email}</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};



export default BuscarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  itemText: { fontSize: 14, marginVertical: 3, color: '#333' },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#999' },
  title: {
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemText:{
     fontWeight: 'bold',
    fontSize: 15,
  }
});