import { StyleSheet, Text, View } from 'react-native'
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from 'react'
import { useEffect } from 'react';


const VerScreen = () => {
  const db = useSQLiteContext();  
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
        const result = await db.getAllAsync("SELECT * FROM items");
        console.log("Datos obtenidos:", result);
      setItems(result); 
    } catch (error) {
      console.log("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  

console.log(items);
    return (
    <View>
      
        {items.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                    <Text style={styles.itemText}>Nombre: {item.name}</Text>
                    <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
                </View>)
            

          


            )
        }
    </View>
            )
}
export default VerScreen

const styles = StyleSheet.create({})