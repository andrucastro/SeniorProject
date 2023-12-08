import { View, Text, TextInput, Button, ActivityIndicator, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import {useState} from "react";
import { StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displaName, setDisplaName] = useState('cuauh');
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const singIn = async () =>{

        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            alert("signed in")
        }catch(error){
            console.log(error)
            alert(error)
            setLoading(false)
        }
    }

    const singUp = async () =>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            alert("check you email ")
        }catch(error){
            console.log(error);
            alert(error);
        }finally{
            setLoading(false);
        }
    }
    
return(
    <ImageBackground source={require('../assets/home/homebg.png')} style={styles.backgroundImage}>
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Image
                    source={require('../assets/home/logo.png')}
                    style={styles.logo}
                />
                    
                <View>
                <TextInput style={styles.input} 
                value={email} 
                placeholder="email" 
                onChangeText={(text) => setEmail(text)}
                />
                </View>   

                <TextInput 
                style={styles.input} 
                value={password} 
                placeholder="password" 
                secureTextEntry={true} 
                onChangeText={(text) => setPassword(text)}
                />

            
                <TouchableOpacity style={styles.btn} onPress={singIn}>
                <Text style={styles.btn_text}> Login </Text>
                </TouchableOpacity>
        
                {/* <TouchableOpacity style={styles.btn} title="Create account" onPress={singUp}>
                <Text style={styles.btn_text}> Sing Up </Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.btn} title="Create account" onPress={() => {navigation.navigate("SignUp")}}>
                <Text style={styles.btn_text}> Sing Up </Text>
                </TouchableOpacity>
                    
                    
            </View>
        </KeyboardAvoidingView>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
    },
    logo: {
        alignSelf: "center",
        marginBottom: 30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        justifyContent: 'center',
    },
    input: {
        backgroundColor: "white",
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 12,
        opacity: 0.5,
        borderRadius: 10,
        fontSize: 15,
    },
    btn: {
        backgroundColor:"#65C9CF",
        paddingVertical: 10,
        marginBottom: 20,
        borderRadius:50,
    },
    btn_text:{
        fontWeight: 600,
        textAlign: "center",
        fontSize:19,
        color:"white",
    }
});

export default Login;