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
import { child, push, ref, set } from 'firebase/database';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Quiz from './Quiz';
import Stats from './Stats';

function Menu({ navigation }) {
  // Conditional for display view
  const [insertWord, setInsertWord] = useState(true);
  const [insertAnswer, setInsertAnswer] = useState(false);

  // Conditional for entering new words
  const [newWord, setNewWord] = useState('');
  const [answer, setAnswer] = useState('');

  function saveWord() {
    // Create key
    const newkey = push(child(ref(db), 'users')).key;
    try {
      // Remove spaces from word and answer
      newWord.trim();
      answer.trim();

      // Get the date that the word was added
      const currentDate = new Date();
      const dateString = currentDate.toString();

      // Verify if the words already exists
      fetch('https://memowords-1630a-default-rtdb.firebaseio.com/words.json')
        .then((response) => response.json())
        .then((data) => {
          let wordExists = false;

          for (const key in data) {
            // If the word already exists, show an alert
            if (data[key].word === newWord) {
              alert('The word already exists in the data base');
              wordExists = true;
              break;
            }
          }

          // If the word doesn't exists, store it
          if (!wordExists) {
            // Store the date and Word
            set(ref(db, 'words/' + newkey), {
              word: newWord,
              answer: answer,
              hits: 0,
              date: dateString,
              userId: FIREBASE_AUTH.currentUser.uid,
            }).then(() => {
              alert('word ' + newWord + ' was added');
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <View style={styles.quiz}>
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to Quiz');
              navigation.navigate('Quiz');
            }}
          >
            <Image
              source={require('../assets/menu/brain.png')}
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.tagQuiz}>Quiz</Text>
        </View>

        <View style={styles.quiz}>
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to Quiz');
              navigation.navigate('Stats');
            }}
          >
            <Image
              source={require('../assets/menu/stats.png')}
              style={styles.icon}
            ></Image>      
            <Text style={styles.tagStats}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quiz}>
          <Image
            source={require('../assets/menu/profile.png')}
            style={styles.icon}
          ></Image>
          <Text style={styles.tagProfile}>Profile</Text>
        </View>

        <View style={styles.quiz}>
        <TouchableOpacity
            onPress={() => {
              console.log('Navigating to Quiz');
              navigation.navigate('Settings');
            }}
          >
          <Image
            source={require('../assets/menu/settings.png')}
            style={styles.icon}
          ></Image>
          <Text style={styles.tagSettings}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addWordContainer}>
        {insertWord && (
          <>
            <Text style={styles.text}>Add word to learn</Text>
            <TextInput
              style={styles.wordInput}
              placeholder="Write the word to learn"
              onChangeText={(text) => setNewWord(text)}
            />
            <TouchableOpacity
              style={styles.nextButton}
              title="next"
              onPress={() => {
                setInsertWord(false);
                setInsertAnswer(true);
              }}
            >
              <Text style={styles.textBtn} textBtn>
                Next
              </Text>
            </TouchableOpacity>
          </>
        )}
        {insertAnswer && (
          <>
            <Text style={styles.text}>Add translation</Text>
            <TextInput
              style={styles.wordInput}
              placeholder="Write the translation"
              onChangeText={(text) => setAnswer(text)}
            />
            <TouchableOpacity
              style={styles.addWordBtn}
              onPress={() => {
                saveWord(), setInsertWord(true), setInsertAnswer(false);
              }}
            >
              <Text style={styles.addWordText}>Add Word</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 30,
    paddingTop: 150,
  },
  icon:{
    marginBottom:10,
  },
  tagQuiz:{
    fontSize:18,
    textAlign: 'center',
    fontWeight:'600',
    color:'#65C9CF'
  },
  tagStats:{
    fontSize:18,
    textAlign: 'center',
    fontWeight:'600',
    color:'#F7AA24'
  },
  tagProfile:{
    fontSize:18,
    textAlign: 'center',
    fontWeight:'600',
    color:'#E55454'
  },
  tagSettings:{
    fontSize:18,
    textAlign: 'center',
    fontWeight:'600',
    color:'#444444'
  },
  quiz: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 150,
    marginBottom: 20,
    backgroundColor: 'white', // Background color
    elevation: 5, // Add elevation for drop shadow (for Android)
    shadowColor: '#000', // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    shadowOpacity: 0.3, // Shadow opacity (for iOS)
    shadowRadius: 3, // Shadow radius (for iOS)
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addWordContainer: {
    backgroundColor: 'white',
    padding: 30,
    elevation: 5, // Add elevation for drop shadow (for Android)
    shadowColor: '#000', // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    shadowOpacity: 0.3, // Shadow opacity (for iOS)
    shadowRadius: 3, // Shadow radius (for iOS)
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
  },
  wordInput: {
    textAlign: 'center',
    borderBottomWidth: 1, // Border bottom width
    borderBottomColor: '#000000', // Border bottom color
    padding: 15,
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center',
  },
  nextButton: {
    borderWidth: 2, // Border bottom width
    borderColor: '#65C9CF', // Border bottom color
    borderStyle: 'solid', // Border bottom style
    padding: 10,
  },
  textBtn: {
    textAlign: 'center',
    color: '#65C9CF',
    fontSize: 18,
  },
  addWordBtn: {
    backgroundColor: '#65C9CF',
    padding: 10,
  },
  addWordText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Menu;
