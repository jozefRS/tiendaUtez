import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../config/utils/firebaseConnection";
import { Input } from '@rneui/base';
import { Image } from '@rneui/base';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Nuevo estado para registrar


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe; 
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Bienvenido", "Inicio de sesión exitoso");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión");
      setIsRegistering(false); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.title}>Bienvenido {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
            <Image source={require('../../../../assets/images.png')} style={{ width: 60, height: 60 }} />

            <Text style={styles.title}>{isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}</Text>
            <Input
           inputContainerStyle={{width: '100%'}}
            
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
      inputContainerStyle={{width: '100%'}}

            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
         <TouchableOpacity style={styles.button} onPress={isRegistering ? handleRegister : handleLogin}>
            <Text style={styles.buttonText}>{isRegistering ? "Registrar" : "Ingresar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.switchText}>
              {isRegistering ? "Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 120,
  },
  card: {
    width: '300%',
    height: '300px',
    backgroundColor: '#fff',
    padding: 110,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, //  en Android
    alignItems: 'center',
  },
  loggedInContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,

    },

  
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#007BFF',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

