import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function SubirScreen() {
  const db = useSQLiteContext();

  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");

  const handleInsert = async () => {
    // Validar que los campos no estén vacíos
    if (!name || !tipo || !color || !direccion) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO items (name, tipo, color, direccion, foto) VALUES (?, ?, ?, ?, ?)",
        [name, tipo, color, direccion, foto]
      );

      Alert.alert("Éxito", "Mascota guardada correctamente");

      // Limpiar formulario
      setName("");
      setTipo("");
      setColor("");
      setDireccion("");
      setFoto("");

    } catch (error) {
      console.log("ERROR INSERT:", error);
      Alert.alert("Error", "Error al guardar la mascota");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Mascota</Text>
      <View style={styles.formulario}>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre" 
          value={name} 
          onChangeText={setName} 
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Tipo (gato, perro...)" 
          value={tipo} 
          onChangeText={setTipo} 
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Color" 
          value={color} 
          onChangeText={setColor} 
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Dirección" 
          value={direccion} 
          onChangeText={setDireccion} 
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Foto (URL)" 
          value={foto} 
          onChangeText={setFoto} 
          placeholderTextColor="#999"
        />

        <Button title="Guardar" onPress={handleInsert} color="#032b10ff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#032b10ff", 
    alignItems: "center", 
    padding: 20, 
    justifyContent: "center" 
  },
  formulario: { 
    width: "100%", 
    height: "60%", 
    marginTop: 20, 
    backgroundColor: "#f7eaeaff", 
    padding: 15, 
    borderRadius: 8 
  },
  input: {
    borderWidth: 1,
    borderColor: "#020202ff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#f7eaeaff" 
  }
});