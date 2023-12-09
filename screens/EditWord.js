import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { update, ref, remove } from 'firebase/database';
import { db } from '../firebaseConfig';

export default function EditWord({ route, navigation }) {
  const { word, answer, id } = route.params;

  const [newWord, setNewWord] = useState(word);
  const [newAnswer, setNewAnswer] = useState(answer);

  const updateWord = () => {
    try {
      update(ref(db, 'words/' + id), {
        word: newWord,
        answer: newAnswer,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWord = async () => {
    try {
      await remove(ref(db, 'words/' + id));
      console.log('Word Deleted Successfully!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // No need for animations, so no effect is necessary
  }, [word]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Word</Text>

      <View>
        <View>
          <Text style={styles.text}>Word</Text>
          <TextInput
            style={styles.word}
            onChangeText={setNewWord}
            value={newWord}
          />
        </View>
        <View>
          <Text style={styles.text}>Translation</Text>
          <TextInput
            style={styles.translation}
            onChangeText={setNewAnswer}
            value={newAnswer}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={updateWord}>
            <Text style={styles.btn_text}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn_delete} onPress={deleteWord}>
            <Text style={styles.btn_text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
  },
  word: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  translation: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#65C9CF',
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  btn_text: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
  btnContainer:{
    marginTop:80,
  },
  btn_delete:{
    backgroundColor: '#E55454',
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  }
});
