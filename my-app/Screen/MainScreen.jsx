import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function MainScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Sesión cerrada");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🐾 BuscaMascotas</Text>
      <Text style={styles.subtitle}>¿Qué deseas hacer?</Text>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Ir a Encontre 🐾"
            onPress={() => {
          
              navigation.navigate("encontre");
            }}
            color="#15d1dfff"
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Agregar Mascota 🐾"
            onPress={() => {
            
              navigation.navigate("Subir");
            }}
            color="#FF9500"
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Ver Mascotas 🐾"
            onPress={() => {
              console.log("Navegando a Ver...");
              navigation.navigate("Ver");
            }}
            color="#1387e6ff"
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Buscar Mascota 🐾"
            onPress={() => {
              console.log("Navegando a Buscar...");
              navigation.navigate("Buscar");
            }}
            color="#11ca93ff"
          />
        </View>

        <View style={styles.buttonLogout}>
          <Button
            title="Cerrar Sesión 🐾"
            onPress={handleLogout}
            color="#FF3B30"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000'
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20
  },
  button: {
    marginBottom: 12,
    paddingHorizontal: 10
  },
  buttonLogout: {
    marginBottom: 12,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    width: '100%'
  }
});