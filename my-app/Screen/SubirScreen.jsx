import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function FormScreen() {
  const db = useSQLiteContext();


  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState("");

  const handleInsert = async () => {
    try {
      await db.execAsync(
        "INSERT INTO items (name, tipo, color, direccion, foto) VALUES (?, ?, ?, ?, ?)",
        [name, tipo, color, direccion, foto]
      );

      alert("Mascota guardada correctamente");
      // limpiar formulario
      setName("");
      setTipo("");
      setColor("");
      setDireccion("");
      setFoto("");

    } catch (error) {
      console.log(error);
      alert("Error al guardar");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Agregar Mascota</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={name} 
        onChangeText={setName} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Tipo (gato, perro...)" 
        value={tipo} 
        onChangeText={setTipo} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Color" 
        value={color} 
        onChangeText={setColor} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Dirección" 
        value={direccion} 
        onChangeText={setDireccion} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Foto (URL)" 
        value={foto} 
        onChangeText={setFoto} 
      />

      <Button title="Guardar" onPress={handleInsert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
});