import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';

export default function Settings({ navigation }) {
  const [words, setWords] = useState(null); // Array of words from the database

  async function fetchAndTransform() {
    try {
      const response = await fetch(
        'https://memowords-1630a-default-rtdb.firebaseio.com/words.json'
      );
      const data = await response.json();

      const specificUserId = FIREBASE_AUTH.currentUser.uid;
      const result = Object.keys(data)
        .filter((key) => data[key].userId === specificUserId)
        .map((key) => ({
          id: key,
          ...data[key],
        }));

      console.log(result);
      setWords(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Get Word from API
  useEffect(() => {
    fetchAndTransform();
  }, [words]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <ScrollView style={styles.scroll}>
        {words &&
          words.map((wordItem) => (
            <>
            <View style={styles.row}>
              <View key={wordItem.id}>
                <Text style={styles.word}>Word: {wordItem.word}</Text>
                <Text style={styles.answer}>Translation: {wordItem.answer}</Text>
                {/* You can add additional styling or components as needed */}
              </View>
              <View>
                <TouchableOpacity
                  key={wordItem.id}
                  onPress={() => {
                    console.log('Navigating to Edit');
                    navigation.navigate('Edit Word', {
                      word: wordItem.word,
                      answer: wordItem.answer,
                      id: wordItem.id,
                    });
                  }}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.separator}></View>
            </>
          ))}
      </ScrollView>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    paddingTop: 50,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  scroll: {
    paddingBottom: 10,
    height: '80%',
  },
  separator: {
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  row: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
    answer: {
        fontSize: 18,
        marginBottom: 10,
    },
});
