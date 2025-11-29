import React from 'react';

// Importamos los componentes visuales de React Native
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Alert 
} from 'react-native';

// --- FIREBASE ---
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
export default function MainScreen({ user }) {

  // --- FUNCIÓNES ---

  const handleLogout = async () => {
    try {
      // Llamamos a Firebase: "che Firebase, cierra la sesión actual"
      await signOut(auth);
   
    } catch (err) {

      Alert.alert("Error", err.message);
    }
  };

  // --- RENDERIZADO (LO QUE SE VE) ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido! esta es la app con firebase</Text>
      <Text style={styles.emailText}>{user?.email}</Text> 
      
  
      <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />
    </View>
  );
};

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    marginVertical: 20,
  }
});