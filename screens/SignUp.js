import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebaseConfig';
import { update, ref, set } from 'firebase/database';

function SignUp({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = FIREBASE_AUTH;

  // SING UP lOGIC
  const singUp = async () => {
    if(password == confirmPassword){
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Redirect 
        navigation.navigate('SignUp2')
      } catch (error) {
        console.log(error);
        alert(error);
      } 
    }else{
      alert("The passwords do not match")
    }
  
  };


  // DATE PICKER LOGIC
  const onChange = (event, selectedDate) => {
    setBirthDate(selectedDate);
  };

  return (
    <ImageBackground
      source={require('../assets/signup.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logowhite.png')}
        ></Image>
        <Text style={styles.title}>Sign Up</Text>

       
        <View>
          <Text style={styles.text}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          title="Create account"
          onPress={singUp}
        >
          <Text style={styles.btn_text}> Create account </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 30,
    alignContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginTop:40,

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
    width: '100%',
  },
  btn: {
    marginTop:50,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 50,
  },
  btn_text: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },

  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
    fontWeight:'600'
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
});
