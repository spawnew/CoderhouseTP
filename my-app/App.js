import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navigation from './navigation/Navigation';
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 Verificando autenticación...");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("👤 Usuario:", currentUser?.email || "No autenticado");
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Text style={{ fontSize: 16, color: '#666' }}>Cargando usuario...</Text>
      </View>
    );
  }

  return <Navigation user={user} />;
}

function DBInitializer() {
  const db = useSQLiteContext();

  useEffect(() => {
    const setupDB = async () => {
      try {
        console.log("📱 Inicializando base de datos...");
        
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tipo TEXT NOT NULL,
            color TEXT NOT NULL,
            direccion TEXT NOT NULL,
            foto TEXT,
            email TEXT,
            latitude REAL,
            longitude REAL,
            createdAt TEXT
          );
        `);
        console.log("✅ Tabla items creada correctamente con todas las columnas");
      } catch (error) {
        console.log("❌ Error al crear tabla:", error);
      }
    };

    setupDB();
  }, [db]);

  return null;
}


export default function App() {
  return (
    <Provider store={store}>
      <SQLiteProvider databaseName="Mascota">
        <DBInitializer />
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SQLiteProvider>
    </Provider>
  );
}