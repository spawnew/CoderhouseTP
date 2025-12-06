import { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Text } from "react-native";
import { useDispatch } from "react-redux";
import { addPet } from "../redux/slices/petsSlice";
import { useSQLiteContext } from "expo-sqlite";
import * as Location from 'expo-location';

export default function SubirScreen({ navigation }) {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [direccion, setDireccion] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setGettingLocation(true);
      console.log("📍 Solicitando permisos de ubicación...");

      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación para reportar mascotas');
        setGettingLocation(false);
        return;
      }

      console.log("📍 Obteniendo ubicación actual...");
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = currentLocation.coords.latitude.toString();
      const lon = currentLocation.coords.longitude.toString();

      console.log("✅ Ubicación obtenida - Lat:", lat, "Lon:", lon);
      setLatitude(lat);
      setLongitude(lon);
      setGettingLocation(false);

    } catch (error) {
      console.log("❌ Error al obtener ubicación:", error);
      Alert.alert('Error', 'No se pudo obtener la ubicación: ' + error.message);
      setGettingLocation(false);
    }
  };

  const handleSave = async () => {
    if (!db) {
      Alert.alert("Error", "La base de datos no está disponible");
      return;
    }

    if (!name.trim() || !tipo.trim() || !color.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!latitude || !longitude) {
      Alert.alert("Error", "Se requiere la ubicación. Presiona 'Obtener Mi Ubicación'");
      return;
    }

    setLoading(true);
    try {
      console.log("💾 Guardando mascota en SQLite...");
      
      // Guardar coordenadas como string
      const locationString = `${latitude},${longitude}`;
      
      // Insertar en BD
      await db.runAsync(
        "INSERT INTO items (name, tipo, color, direccion, foto) VALUES (?, ?, ?, ?, ?)",
        [name.trim(), tipo.trim(), color.trim(), direccion.trim(), locationString]
      );

      console.log("✅ Mascota guardada correctamente");
      
      // Agregar a Redux
      dispatch(addPet({
        id: Date.now(),
        name: name.trim(),
        tipo: tipo.trim(),
        color: color.trim(),
        direccion: direccion.trim(),
        foto: locationString,
        createdAt: new Date().toISOString()
      }));

      Alert.alert("Éxito", "Mascota agregada con ubicación correctamente");

      // Limpiar formulario
      setName("");
      setTipo("");
      setColor("");
      setDireccion("");
      setLatitude("");
      setLongitude("");

      // Volver a la pantalla anterior
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
        <Text style={styles.title}>📝 Reportar Mascota Perdida</Text>

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

       

        <Text style={styles.label}>📍 Coordenadas GPS</Text>

        <TextInput 
          style={styles.input}
          placeholder="Latitud"
          placeholderTextColor="#999"
          value={latitude}
          onChangeText={setLatitude}
          editable={!loading}
          keyboardType="decimal-pad"
        />

        <TextInput 
          style={styles.input}
          placeholder="Longitud"
          placeholderTextColor="#999"
          value={longitude}
          onChangeText={setLongitude}
          editable={!loading}
          keyboardType="decimal-pad"
        />

        <Button 
          title={gettingLocation ? "Obteniendo..." : "📍 Obtener Mi Ubicación"} 
          onPress={getLocation}
          disabled={loading || gettingLocation}
          color="#FF9500"
        />

        <View style={styles.spacer} />

        <Button 
          title={loading ? "Guardando..." : "💾 Guardar Mascota"} 
          onPress={handleSave}
          disabled={loading || gettingLocation || !latitude || !longitude}
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