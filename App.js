import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { db } from './firebaseConfig';
import { update, ref, onValue } from 'firebase/database';
import Menu from './screens/Menu';
import Quiz from './screens/Quiz';
import Login from './screens/Login';
import Stats from './screens/Stats';
import SignUp from './screens/SignUp';
import Settings from './screens/Settings';
import EditWord from './screens/EditWord';
import SignUp2 from './screens/SignUp2';


const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  const [nickName, setNickName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      // console.log(user)
      // const test = ref(db, 'users/' + user.uid);
      // onValue(test, (snapshot)=>{
      //   const data = snapshot.val()
      //   setNickName(data.nickName)
      // })
    
  });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        {user && nickName ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name='Menu' component={Menu} />
            <Stack.Screen name='Quiz' component={Quiz} />
            <Stack.Screen name='Stats' component={Stats} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='Edit Word' component={EditWord} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='SignUp2' component={SignUp2} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}