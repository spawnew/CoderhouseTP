import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MapPreview = ({ location }) => {
  const { latitude, longitude } = location || {};

  // Verifica si la ubicación está disponible
  const imagePreviewUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=TU_API_KEY`
    : null;

  return (
    <View style={styles.mapPreview}>
      {location ? (
        <Image 
          style={styles.mapImage} 
          source={{ uri: imagePreviewUrl }} 
        />
      ) : (
        <View style={styles.noLocationText}>
          <Text>Sin ubicación seleccionada</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  noLocationText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPreview