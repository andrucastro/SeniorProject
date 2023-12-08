import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import Menu from './screens/Menu';
import Quiz from './screens/Quiz';
import Login from './screens/Login';
import Stats from './screens/Stats';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  },[])

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='login'>

          {user ? (
            <>
              <Stack.Screen name='Menu' component={Menu}/>
              <Stack.Screen name='Quiz' component={Quiz}/>
              <Stack.Screen name='Stats' component={Stats}/>
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='SignUp' component={SignUp}/>
            </>
          )}      
        
    </Stack.Navigator>
 </NavigationContainer>
  );
}


