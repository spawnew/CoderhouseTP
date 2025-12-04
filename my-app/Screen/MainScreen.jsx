import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Image } from 'react-native';
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
          <View style={{  width:"70%",alignItems:"center", marginBottom:20, justifyContent:'space-between',flexDirection:"row"}}>
              <Text style={styles.title}>Bienvenido! Patitas</Text>
           <Image
        style={styles.tinyLogo}
        source={{
          uri:"https://media.istockphoto.com/id/1005374612/es/vector/logotipo-de-icono-del-pata-de-perro.jpg?s=612x612&w=0&k=20&c=Tvc9Ur17w0PDaU0ZX-AfI46dtS2ZAndzVkhjfbY9xkA="
        }}
      />
          </View>
          
<View style={styles.botonera}>
      

      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        title="Ir a Subir"
        onPress={() => navigation.navigate("Subir")} 
          />
            <Button
        title="Ver Mascotas"
              onPress={() => navigation.navigate("Ver")}
              />
              <Button 
        title="Cerrar Sesión" 
        onPress={handleLogout} 
        color="red" 
              />
                  <Button 
        title="buscar mascota" 
        onPress={() => navigation.navigate("Buscar")} 
        color="red" 
      />
          </View>
           </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    botonera: {   justifyContent: 'space-between' },
    tinyLogo: {
    width: 50,
    height: 50,
  },
  
});
