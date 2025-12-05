import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';

const LocationSelector = () => {
  const [pickedLocation, setPickedLocation] = useState();

  const getLocationHandler = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log('Error al obtener la ubicación:', error);
    }
  };

  return (
    <View style={styles.locationSelector}>
      <MapPreview location={pickedLocation} />
      <Button 
        title="Obtener mi ubicación" 
        onPress={getLocationHandler} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
  },
});

export default LocationSelector;