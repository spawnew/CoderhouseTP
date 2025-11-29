import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
export default function HomeScreen() {
  return (
      <View style={styles.container }>
          <Text style={styles.title }>HomeScreen</Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" ,backgroundColor: "#080808ff" },
  title: { fontSize: 22, marginBottom: 10, color:"#f7eaeaff" },
  emailText: { fontSize: 16, marginBottom: 20 },

});