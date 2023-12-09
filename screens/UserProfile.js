import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { child, push, ref, set, onValue} from 'firebase/database';
import {images} from '../assets/profilePic';


function UserProfile({ navigation }) {
  // Conditional for display view

  const [userInfo, setUserInfo] = useState(null);

  // Conditional for entering new words

  useEffect(()=>{
      const test = ref(db, `users/`+ FIREBASE_AUTH.currentUser.uid);
      onValue(test, (snapshot)=>{
        const data = snapshot.val()
        setUserInfo(data)
      })
  },[])

  return (
    <View style={styles.container}>
     
          <Text style={styles.nickName}>{userInfo?.nickName}</Text>
          <View style={styles.picContainer}>
              <Image style={styles.profilePic} source={images.avatar[userInfo?.avatar]}></Image>
          </View>
          <Text style={styles.Text} >
            {userInfo?.email}
          </Text>
          <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      >
        <Text style={styles.btn_text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  nickName:{
    fontSize:40,
    textAlign:'center',
    fontWeight:'500',
    marginBottom:20,
  },
  picContainer:{
    height:150,
    width:150,
    alignSelf:'center',
    marginRight:10,
    marginBottom:20,
  },
  profilePic:{
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  btn_text: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
  btn: {
    backgroundColor: '#65C9CF',
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  Text:{
    alignSelf:'center',
    fontSize:20,
    marginBottom:100,
  }
 
 
  

 
});

export default UserProfile;