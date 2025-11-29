import React from 'react';


import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Alert 
} from 'react-native';


import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
export default function MainScreen({ user }) {



  const handleLogout = async () => {
    try {
     
      await signOut(auth);
   
    } catch (err) {

      Alert.alert("Error", err.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido! esta es la app con firebase</Text>
      <Text style={styles.emailText}>{user?.email}</Text> 
      
  
      <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />
    </View>
  );
};



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