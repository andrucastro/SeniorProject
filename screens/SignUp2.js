import React, { useEffect } from 'react';
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
import { useState} from 'react';
import { StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { update, ref, set } from 'firebase/database';

function SignUp2({ navigation }) {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPic, setSelectedPic] = useState(0); // State variable for the selected profile picture path
  const auth = FIREBASE_AUTH;

  const images ={
    avatar:{
      '1': require('../assets/profile/frog.png'),
      '2': require('../assets/profile/kim.png'),
      '3': require('../assets/profile/kitty.png'),
      '4': require('../assets/profile/ramon.png'),
      '5': require('../assets/profile/zac.png'),
    }
  };
  
  const handleImagePress = (index) => {
    setSelectedPic(index);
  };


  // ADD USER TO A DATABASE COLlECTION
    const addUser = ()=>{
      set(ref(db, 'users/' + FIREBASE_AUTH.currentUser.uid), {
          nickName: nickName,
          email: FIREBASE_AUTH.currentUser.email,
          avatar:selectedPic,
          score:0,
        });
        navigation.navigate('Menu')
    }


  return (
    <ImageBackground
      source={require('../assets/signup.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.logoContainer}>
          <Image style={styles.pic} source={images.avatar[selectedPic]}></Image>
        </View>
        <View>
          <Text style={styles.text}>Nickname</Text>
          <TextInput
            style={styles.input}
            value={nickName}
            onChangeText={(text) => setNickName(text)}
          />
        </View>
        <Text style={styles.text}>Choose an Avatar</Text>
        <View style={styles.picGrid}>
          {Object.keys(images.avatar).map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.picContainer}
              onPress={() => handleImagePress(key)}
            >
              <Image source={images.avatar[key]} style={styles.pic}></Image>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btn} 
        onPress={addUser}>
          <Text style={styles.btn_text}>Create account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default SignUp2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    alignContent: 'center',
  },
  logoContainer:{
    height: 100,
    width: 100,
    marginBottom:5,
    alignSelf:'center'
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
    marginBottom: 20,
  },
  picGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  picContainer: {
    height: 100,
    width: 100,
    marginBottom: 10,
    marginRight: 10,
  },
  pic: {
    flex: 1,
    resizeMode: 'contain',
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
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
  },
});
