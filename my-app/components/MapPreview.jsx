import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, Linking, Button } from 'react-native';

const MapPreview = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!location) {
    return (
      <View style={styles.mapPreview}>
        <Text style={styles.noLocationTextStyle}>❌ Sin ubicación disponible</Text>
      </View>
    );
  }

  const { latitude, longitude } = location;

  // solucion por que no me toma bien apikey de google maps
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=400x300&maptype=roadmap&markers=color:red%7C${latitude},${longitude}`;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/${latitude},${longitude}`;
    Linking.openURL(url);
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Ubicación de la mascota</Text>
      
      <View style={styles.mapPreview}>
        {loading && (
          <ActivityIndicator 
            size="large" 
            color="#007AFF" 
            style={styles.loader} 
          />
        )}
        
        <Image
          style={styles.mapImage}
          source={{ uri: mapUrl }}
          onLoadStart={() => {
            console.log("📱 Cargando mapa...");
            setLoading(true);
          }}
          onLoadEnd={() => {
            console.log("✅ Mapa cargado");
            setLoading(false);
          }}
          onError={(error) => {
            console.log("❌ Error cargando mapa:", error);
            setError(true);
            setLoading(false);
          }}
        />

        {error && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>⚠️ No se pudo cargar el mapa</Text>
          </View>
        )}

        <View style={styles.coordinates}>
          <Text style={styles.coordText}>📍 Lat: {latitude.toFixed(4)}</Text>
          <Text style={styles.coordText}>📍 Lon: {longitude.toFixed(4)}</Text>
        </View>
      </View>

      <Button 
        title="🗺️ Abrir en Google Maps"
        onPress={openInGoogleMaps}
        color="#007AFF"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginVertical: 15
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  coordinates: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 5
  },
  coordText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  noLocationText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  noLocationTextStyle: {
    fontSize: 16,
    color: '#999'
  }
});

export default MapPreview;