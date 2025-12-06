import { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addPet } from "../redux/slices/petsSlice";
import { useSQLiteContext } from "expo-sqlite";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function SubirScreen({ navigation }) {
  const dispatch = useDispatch();
  const db = useSQLiteContext();
  
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
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

  const pickImage = async () => {
    try {
      console.log("📸 Abriendo galería...");
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const base64 = result.assets[0].base64;
        
        console.log("✅ Foto seleccionada:", uri);
        console.log("✅ Base64 obtenido, tamaño:", base64?.length);
        
        setPhoto(uri);
        setPhotoBase64(base64);
      }
    } catch (error) {
      console.log("❌ Error al seleccionar foto:", error);
      Alert.alert('Error', 'No se pudo seleccionar la foto');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = async () => {
    if (!db) {
      Alert.alert("Error", "La base de datos no está disponible");
      return;
    }

    if (!name.trim() || !tipo.trim() || !color.trim() || !direccion.trim() || !email.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }

    if (!latitude || !longitude) {
      Alert.alert("Error", "Se requiere la ubicación. Presiona 'Obtener Mi Ubicación'");
      return;
    }

    if (!photo || !photoBase64) {
      Alert.alert("Error", "Por favor selecciona una foto de la mascota");
      return;
    }

    setLoading(true);
    try {
      console.log("💾 Guardando mascota...");
      
      const photoData = `data:image/jpeg;base64,${photoBase64}`;
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      console.log("📍 Guardando coordenadas - Lat:", lat, "Lon:", lon);

      // Insertar en BD con coordenadas separadas
      await db.runAsync(
        "INSERT INTO items (name, tipo, color, direccion, foto, email, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name.trim(), tipo.trim(), color.trim(), direccion.trim(), photoData, email.trim(), lat, lon]
      );

      console.log("✅ Mascota guardada correctamente");
      
      // Agregar a Redux
      dispatch(addPet({
        id: Date.now(),
        name: name.trim(),
        tipo: tipo.trim(),
        color: color.trim(),
        direccion: direccion.trim(),
        foto: photoData,
        email: email.trim(),
        latitude: lat,
        longitude: lon,
        createdAt: new Date().toISOString()
      }));

      Alert.alert("Éxito", "Mascota agregada correctamente");

      // Limpiar formulario
      setName("");
      setTipo("");
      setColor("");
      setDireccion("");
      setEmail("");
      setLatitude("");
      setLongitude("");
      setPhoto(null);
      setPhotoBase64(null);

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

        <TextInput 
          style={styles.input}
          placeholder="Dirección o zona donde se perdió"
          placeholderTextColor="#999"
          value={direccion}
          onChangeText={setDireccion}
          editable={!loading}
        />

        <TextInput 
          style={styles.input}
          placeholder="📧 Tu email (para contacto)"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>📸 Foto de la mascota</Text>

        {photo && (
          <View style={styles.photoContainer}>
            <Image 
              source={{ uri: photo }} 
              style={styles.photoPreview}
            />
            <Button 
              title="❌ Cambiar foto"
              onPress={pickImage}
              disabled={loading}
              color="#FF9500"
            />
          </View>
        )}

        {!photo && (
          <Button 
            title="📸 Seleccionar foto de galería"
            onPress={pickImage}
            disabled={loading}
            color="#FF9500"
          />
        )}

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
          disabled={loading || gettingLocation || !latitude || !longitude || !photo}
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