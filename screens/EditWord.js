import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
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
          <Text>New Word:</Text>
          <TextInput onChangeText={setNewWord} value={newWord} />
        </View>
        <View>
          <Text>Translation:</Text>
          <TextInput onChangeText={setNewAnswer} value={newAnswer} />
        </View>
        <Button title="Update Word" onPress={updateWord} />
        <Button title="Delete Word" onPress={deleteWord} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  successMessage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    padding: 16,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
