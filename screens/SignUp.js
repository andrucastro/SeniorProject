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
import DatePickerIOS from '@react-native-community/datetimepicker';
import { db } from '../firebaseConfig';
import { update, ref, set } from 'firebase/database';

function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const auth = FIREBASE_AUTH;

  // SING UP lOGIC
  const singUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // ADD USER TO A DATABASE COLlECTION
//   const addUser = ()=>{
//     set(ref(db, 'users/' + FIREBASE_AUTH.currentUser.uid), {
//         name: name,
//         email: email,
//         score: 0,
//       });
//   }
  
  

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
          <Text style={styles.text}>User Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View>
          <Text style={styles.text}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
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
          <Text style={styles.dateText}>Pick your Birth Date </Text>
          <DatePickerIOS
            style={styles.datePicker}
            value={birthDate}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          title="Create account"
          onPress={()=>{ singUp(), addUser()}}
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
    paddingHorizontal: 30,
    paddingTop: 20,
    alignContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 50,
  },
  btn_text: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  datePicker: {
    width: '35%',
    alignSelf: 'center',
    marginBottom: 25,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
  },
  dateText: {
    color: 'white',
    marginTop: 20,
    marginBottom: 12,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
  },
});
