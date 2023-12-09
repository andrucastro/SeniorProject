import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { update, ref } from 'firebase/database';

function Quiz({ navigation }) {
  const [words, setWords] = useState(null); // Array of words from the database
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Current word being asked
  const [answer, setAnswer] = useState(''); // User input answer
  const [correct, setCorrect] = useState(false); // State for correct or wrong answer
  const [displayMessageBlock, setDisplayMessageBlock] = useState(false); // Display message for correct or incorrect
  const [displayMessage, setDisplayMessage] = useState(''); // Display or hide feedback box
  const [showWordDate, setShowWordDate] = useState(''); // Date the word will be asked next time
  const [wordDate, setWordDate] = useState(''); // Date the word was asked, stored in the database

  // Final Stats
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(['1']);
  function doSomething(){
    navigation.navigate('Menu')
  }
 

  // Function to add a new word to the array of wrongAnswers
  const addWrongAnswer = (word) => {
    setWrongAnswers((wrongAnswers) => [...wrongAnswers, word]);
    console.log(wrongAnswers);
  };

  // animations
  const feedbackBoxBottom = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    async function fetchAndTransform() {
      try {
        const response = await fetch(
          'https://memowords-1630a-default-rtdb.firebaseio.com/words.json'
        );
        const data = await response.json();

        const specificUserId = FIREBASE_AUTH.currentUser.uid;
        const currentDate = new Date();

        let result = Object.keys(data)
          .filter(
            (key) =>
              data[key].userId === specificUserId &&
              new Date(data[key].date) < currentDate
          )
          .map((key) => ({
            id: key,
            ...data[key],
          }));

        //check if is null or empty and set the array to empty
        if (result == null) {
          result = [];
        }

        setWords(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAndTransform();
  }, []);

  function askQuestion() {
    // Check if the answer is correct
    if (words[currentWordIndex]?.word === answer) {
      setRightAnswers(wordDate + 1);
      var currentDate = new Date();

      switch (words[currentWordIndex].hits) {
        case 0:
          currentDate.setDate(currentDate.getDate() + 1);
          console.log(currentDate);
          setShowWordDate(currentDate.toString());
          break;

        case 1:
          currentDate.setDate(currentDate.getDate() + 2);
          console.log(currentDate);
          setShowWordDate(currentDate.toString());
          break;

        case 2:
          currentDate.setDate(currentDate.getDate() + 3);
          setShowWordDate(currentDate.toString());
          break;

        case 3:
          currentDate.setDate(currentDate.getDate() + 5);
          setShowWordDate(currentDate.toString());
          break;

        case 4:
          currentDate.setDate(currentDate.getDate() + 10);
          setShowWordDate(currentDate.toString());
          break;
      }

      // Update the word in the database
      try {
        console.log(wordDate);
        update(ref(db, 'words/' + words[currentWordIndex].id), {
          hits: words[currentWordIndex].hits + 1,
          date: currentDate,
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }

      // Set the message to display in the feedback box
      setCorrect(true);
      showFeedback('Correct!');
    }
    // Check if the answer is wrong
    else {
      addWrongAnswer(words[currentWordIndex].word);
      setCorrect(false);
      showFeedback('Incorrect!');
      const currentDate = new Date(); // Set today's date
      setShowWordDate(currentDate.toDateString()); // Set the date to display in the feedback box

      // Update the word in the database
      try {
        console.log(wordDate);
        update(ref(db, 'words/' + words[currentWordIndex].id), {
          hits: 0,
          date: currentDate,
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % words.length;
    setCurrentWordIndex(nextIndex);
    // Close the feedback box
    hideFeedback();
  };

  const showFeedback = (message) => {
    setDisplayMessageBlock(true);
    setDisplayMessage(message);

    Animated.timing(feedbackBoxBottom, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      hideFeedback();
    }, 10000);
  };

  const hideFeedback = () => {
    Animated.timing(feedbackBoxBottom, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setDisplayMessageBlock(false);
      setDisplayMessage('');
    });
  };

  return (
    // end the quiz after 5 questions
    <>
      {currentWordIndex < 4 ? (
        <ImageBackground
          source={require('../assets/quiz/quizbg.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            {words && words.length > 5 ? (
              <>
                <Text style={styles.heading}>Type the Translation</Text>
                <Text style={styles.word}>
                  {words[currentWordIndex]?.answer}
                </Text>

                {/* Show the user the correct answer */}
                {displayMessageBlock &&
                  words[currentWordIndex]?.word !== answer && (
                    <Text style={styles.wordFeedback}>
                      {words[currentWordIndex]?.word}
                    </Text>
                  )}

                <TextInput
                  style={styles.response}
                  placeholder="Type the translation"
                  onChangeText={setAnswer}
                  value={answer}
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => askQuestion()}
                >
                  <Text style={styles.btn_text}>Send Response</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn_next}
                  onPress={() => {
                    setDisplayMessageBlock(false);
                    handleNextWord();
                    setAnswer('');
                  }}
                >
                  <Text style={styles.btn_text}>Next Word</Text>
                </TouchableOpacity>

                {displayMessageBlock && (
                  <Animated.View
                    style={
                      correct
                        ? [
                            styles.feedbackBoxRight,
                            { bottom: feedbackBoxBottom },
                          ]
                        : [
                            styles.feedbackBoxWrong,
                            { bottom: feedbackBoxBottom },
                          ]
                    }
                  >
                    <Text style={styles.animationText}>{displayMessage}</Text>
                    <Text style={styles.date}>
                      Will be asked again in {showWordDate}
                    </Text>
                    {correct ? (
                      <Text style={styles.date}>
                        Hits: {words[currentWordIndex]?.hits + 1}{' '}
                      </Text>
                    ) : (
                      <Text style={styles.date}>
                        Hits: {words[currentWordIndex]?.hits}{' '}
                      </Text>
                    )}
                  </Animated.View>
                )}
              </>
            ) : (
              <View style={styles.noWordsContainer}>
                <Text style={styles.noWordsText}>
                  No words to practice. Please add more words or come back
                  later.
                </Text>
                <Text style={styles.noWordsText2}>
                  Please add at least 5 new words to start a quiz
                </Text>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('Menu')}
                >
                  <Text style={styles.btn_text}>Go to Menu</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.container}>
          <Text style={styles.end}>End of the quiz</Text>
          {doSomething()}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 150,
  },

  heading: {
    fontSize: 30,
    marginTop: '-20%',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  word: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50,
  },

  response: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: 'black',
  },

  btn: {
    backgroundColor: '#65C9CF',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 50,
  },
  btn_next: {
    backgroundColor: '#F7AA24',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 50,
  },
  btn_text: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  feedbackBoxRight: {
    bottom: -100,
    width: '100%',
    backgroundColor: '#9DE554',
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  feedbackBoxWrong: {
    bottom: -100,
    width: '100%',
    backgroundColor: '#E55454',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  animationText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  noWordsText: {
    fontSize: 24,
    marginBottom: 50,
  },

  noWordsText2: {
    fontSize: 25,
    marginBottom: 50,
    color: '#E55454',
  },
  date: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  wordFeedback: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: '#E55454',
  },
  end:{
    fontSize: 40,
    textAlign:'center',
    fontWeight:'600'
  }
});

export default Quiz;
