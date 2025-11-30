import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function MainScreen() {
const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
     
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido! BuscaMichi</Text>

      <Button 
        title="Cerrar Sesión" 
        onPress={handleLogout} 
        color="red" 
      />

      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        title="Ir a Subir"
        onPress={() => navigation.navigate("Subir")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
