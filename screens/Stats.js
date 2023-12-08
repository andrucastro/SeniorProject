import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';

function Stats({ navigation }) {
  const [words, setWords] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [wordsLearned, setWordsLearned] = useState(0);

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

      setWords(result);

      // Set the total words entered by the user
      setTotalWords(result.length);

      // Set the total words learned by the user
      const learned = result.filter((word) => word.hits > 3);
      setWordsLearned(learned.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Get Word from API
  useEffect(() => {
    fetchAndTransform();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Image
            source={require('../assets/stats/brain.png')}
            style={styles.icon}
          ></Image>
          <Text style={styles.number}>{wordsLearned}</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../assets/stats/totalw.png')}
            style={styles.icon}
          ></Image>
          <Text style={styles.number}>{totalWords}</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../assets/stats/points.png')}
            style={styles.icon}
          ></Image>
          <Text>100</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            FIREBASE_AUTH.signOut();
          }}
        >
          <Text style={styles.btn_text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#65C9CF',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 50,
  },

  btn_text: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#444444',
  },
  icon: {
    marginBottom: 50,
  },
});
