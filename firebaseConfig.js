// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth , initializeAuth , getReactNativePersistence} from "firebase/auth";
import {getDatabase} from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDg6tx7eXo7HC1WOSkkomAHbyi2uL_i0Ls",
  authDomain: "memowords-1630a.firebaseapp.com",
  projectId: "memowords-1630a",
  storageBucket: "memowords-1630a.appspot.com",
  messagingSenderId: "825152195252",
  appId: "1:825152195252:web:66462041d7281f23f3a5e1",
  measurementId: "G-FZMLCH8389"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getDatabase(FIREBASE_APP);



