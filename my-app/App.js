import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navigation from './Navigation/Navigation';





function InitDatabase() {
  const db = useSQLiteContext();

  useEffect(() => {
    const setup = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            tipo TEXT,
            color TEXT,
            direccion TEXT,
            foto TEXT
          );
        `);
      } catch (error) {
        console.log("Error al crear tabla:", error);
      }
    };

    setup();
  }, []);

  return null; 
}

 function Cargar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuario actual:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }
   return <Navigation user={user} />;
}
export  default function App() {
  return (
    <SQLiteProvider databaseName="Mascota">
     
      <InitDatabase />

      <NavigationContainer>
      
        <Cargar />
       
      </NavigationContainer>
    </SQLiteProvider>
  );
}
