import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const FormScreen = ({ obtener }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = () => {
    if (nombre.trim() === "") {
      alert("Ingresa un nombre");
      return;
    }
    obtener(nombre);
    setNombre("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Buscar" onPress={handleSubmit} color="#007AFF" />
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: { padding: 10, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});