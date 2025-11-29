// Importamos React y el hook 'useState'
import React, { useState } from 'react';


import { StyleSheet, Text, TextInput, View,  Button, } from 'react-native';


import { auth } from '../firebase'; 


import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';


export default function LoginScreen() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

 
  const handleRegister = async () => {
   s
    if (email === '' || password === '') {
      setError("Completa todos los campos.");
      return; 
    }
    
    try {
      setError(null); 
    
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      
      setError(err.message); 
    }
  };


  const handleLogin = async () => {
    
    if (email === '' || password === '') {
      setError("Completa todos los campos.")
      return;
    }

    try {
      setError(null); 

      await signInWithEmailAndPassword(auth, email, password);
    
    } catch (err) {
      setError(err.message); 
    }
  };

  // renderizado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Login</Text>
      
   
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      
 
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

     
      <View style={styles.buttonContainer}>
       
        <Button title="Iniciar Sesión" onPress={handleLogin} />
       
        <Button title="Registrarse" onPress={handleRegister} color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  },
});