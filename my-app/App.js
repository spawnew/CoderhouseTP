import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navigation from './navigation/Navigation';

function InitDatabase() {
  const db = useSQLiteContext();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tipo TEXT NOT NULL,
            color TEXT NOT NULL,
            direccion TEXT NOT NULL,
            foto TEXT
          );
        `);
        console.log("✅ Tabla creada correctamente");
        setDbReady(true);
      } catch (error) {
        console.log("❌ Error al crear tabla:", error);
      }
    };

    setup();
  }, [db]);

  if (!dbReady) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Inicializando base de datos...</Text></View>;
  }

  return null;
}

function Cargar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("👤 Usuario actual:", currentUser?.email || "No autenticado");
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cargando usuario...</Text></View>;
  }

  return <Navigation user={user} />;
}

function AppContent() {
  return (
    <InitDatabase />
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="Mascota">
      <NavigationContainer>
        <AppContent />
        <Cargar />
      </NavigationContainer>
    </SQLiteProvider>
  );
}