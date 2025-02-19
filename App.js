import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image, Input, Button } from '@rneui/base';
import { Icon } from '@rneui/base';
import Login from './src/modules/auth/profile/Login'; 


export default function App() {
  return (
    <View style={styles.container}>
   <Login/>
  </View>
   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
