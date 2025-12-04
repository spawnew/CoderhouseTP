import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { addPet } from "../redux/slices/petsSlice";
import { useSQLiteContext } from "expo-sqlite";

export default function SubirScreen({ navigation }) {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Validar que db esté disponible
    if (!db) {
      Alert.alert("Error", "La base de datos no está disponible");
      return;
    }

    // Validar campos
    if (!name.trim() || !tipo.trim() || !color.trim() || !direccion.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      console.log("💾 Guardando mascota en SQLite...");
      
      // Insertar en SQLite
      await db.runAsync(
        "INSERT INTO items (name, tipo, color, direccion) VALUES (?, ?, ?, ?)",
        [name.trim(), tipo.trim(), color.trim(), direccion.trim()]
      );

      console.log("✅ Mascota guardada correctamente");
      
      // Agregar a Redux
      dispatch(addPet({
        name: name.trim(),
        tipo: tipo.trim(),
        color: color.trim(),
        direccion: direccion.trim(),
        createdAt: new Date().toISOString()
      }));

      Alert.alert("Éxito", "Mascota agregada correctamente");

      // Limpiar formulario
      setName("");
      setTipo("");
      setColor("");
      setDireccion("");

      // Volver a la pantalla anterior (opcional)
      if (navigation?.goBack) {
        navigation.goBack();
      }

    } catch (error) {
      console.log("❌ Error al guardar:", error);
      Alert.alert("Error", "No se pudo guardar la mascota: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Nombre del animal"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />
        <TextInput 
          style={styles.input}
          placeholder="Tipo de animal (Perro, Gato...)"
          placeholderTextColor="#999"
          value={tipo}
          onChangeText={setTipo}
          editable={!loading}
        />
        <TextInput 
          style={styles.input}
          placeholder="Color del animal"
          placeholderTextColor="#999"
          value={color}
          onChangeText={setColor}
          editable={!loading}
        />
        <TextInput 
          style={styles.input}
          placeholder="Dirección del animal"
          placeholderTextColor="#999"
          value={direccion}
          onChangeText={setDireccion}
          editable={!loading}
        />

        <Button 
          title={loading ? "Guardando..." : "Guardar"} 
          onPress={handleSave}
          disabled={loading}
          color="#007AFF"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff"
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#000"
  }
});