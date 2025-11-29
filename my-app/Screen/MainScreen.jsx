import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function MainScreen({ navigation }) {
  
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

      <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />

      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' }
});