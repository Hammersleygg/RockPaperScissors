import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandFist, faHandPaper, faHandRock, faHandScissors } from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from '@react-navigation/stack';


import backgroundImages from '../assets/fighting.png';
import backgroundImage from '../assets/Background.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1.5,
    resizeMode: 'stretch',
    justifyContent: 'bottom',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 250,
  },
  buttonContainer: {
    marginBottom: 36,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    width: Dimensions.get('window').width / 1.6,
    height: Dimensions.get('window').height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  healthBarContainer: {
    width: Dimensions.get('window').width * 0.5,
    height: 20,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
  healthBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
  overlay: {
    flex: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
  },
  iconbutton: {    
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
  }
});

const infoScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



const Stack = createStackNavigator();

function InfoScreen({ route, navigation }) { // Destructure props
  return (
    <View style={infoScreenStyles.container}>
      <ImageBackground source={backgroundImages} style={infoScreenStyles.backgroundImage}>
        <View style={infoScreenStyles.overlay}>
          <Text style={infoScreenStyles.title}>How to Play</Text>
          <Text style={infoScreenStyles.instructions}>1. Each player selects one of the three options: rock, paper, or scissors.</Text>
          <Text style={infoScreenStyles.instructions}>2. The winner is determined based on the choices made:</Text>
          <Text style={infoScreenStyles.instructions}>   - Rock crushes scissors, so rock wins against scissors.</Text>
          <Text style={infoScreenStyles.instructions}>   - Scissors cut paper, so scissors win against paper.</Text>
          <Text style={infoScreenStyles.instructions}>   - Paper covers rock, so paper wins against rock.</Text>
          <Text style={infoScreenStyles.instructions}>3. If both players choose the same option, the game is a tie.</Text>
          <Text style={infoScreenStyles.instructions}>4. Both Players start at 100 HP.</Text>
          <Text style={infoScreenStyles.instructions}>   - 15 damage is dealt if you change your stance.</Text>
          <Text style={infoScreenStyles.instructions}>   - 30 damage is dealt if you keep your stance the whole time.</Text>
          <TouchableOpacity 
            style={infoScreenStyles.button}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <Text style={infoScreenStyles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}



function Player1SelectStance({ route, navigation }) {
  const { player1Health, player2Health } = route.params;

  const [player1Stance, setPlayer1Stance] = useState(null);

  const selectStance = (stance) => {
    setPlayer1Stance(stance);
    navigation.navigate('Player2SelectStance', { player1Stance: stance, player1Health, player2Health });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
        <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
          <Text style={styles.title}>Player 1</Text>
          <View style={styles.healthBarContainer}>
            <View style={{ ...styles.healthBar, width: `${player1Health}%` }} />
          </View>
          <TouchableOpacity
            onPress={() => selectStance('Rock')}
          >
            <FontAwesomeIcon icon={faHandFist} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectStance('Paper')}
          >
            <FontAwesomeIcon icon={faHandPaper} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectStance('Scissors')}
          >
          <FontAwesomeIcon icon={faHandScissors} style={{ ...styles.iconbutton, transform: [{ rotate: '180deg' },{ scaleY: -1 } ] }} size={100} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

function Player2SelectStance({ route, navigation }) {
  const { player1Stance, player1Health, player2Health } = route.params;
  const [player2Stance, setPlayer2Stance] = useState(null);

  const selectStance = (stance) => {
    setPlayer2Stance(stance);
    navigation.navigate('Player1ChangeStance', { player1Stance, player2Stance: stance, player1Health, player2Health });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5  }]}>
      <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
          <Text style={styles.title}>Player 2</Text>
          <View style={styles.healthBarContainer}>
            <View style={{ ...styles.healthBar, width: `${player2Health}%` }} />
          </View>

          <TouchableOpacity onPress={() => selectStance('Rock')} >
          <FontAwesomeIcon icon={faHandFist} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectStance('Paper')}
          >
            <FontAwesomeIcon icon={faHandPaper} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectStance('Scissors')}
          >
          <FontAwesomeIcon icon={faHandScissors} style={{ ...styles.iconbutton, transform: [{ rotate: '180deg' },{ scaleY: -1 } ] }} size={100} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

function Player1ChangeStance({ route, navigation }) {
  const { player1Stance, player2Stance, player1Health, player2Health } = route.params;
  const [Player1Move, setPlayer1Move] = useState(null);

  const changeStance = (stance) => {
    setPlayer1Move(stance);
    navigation.navigate('Player2ChangeStance', { player1Stance, player2Stance, player1Move: stance, player1Health, player2Health});
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
        <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
            <Text style={styles.title}>Player 1</Text>
            <View style={styles.healthBarContainer}>
            <View style={{...styles.healthBar, width: `${player1Health}%`}} />
          </View>
          <Text style={styles.instructions}>Your Current Stance: {player1Stance}</Text>
          <Text style={styles.instructions}>Opponents Current Stance: {player2Stance}</Text>

          <TouchableOpacity 
            onPress={() => changeStance('Rock')}
          >
            <FontAwesomeIcon icon={faHandFist} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => changeStance('Paper')}
          >
            <FontAwesomeIcon icon={faHandPaper} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => changeStance('Scissors')}
          >
          <FontAwesomeIcon icon={faHandScissors} style={{ ...styles.iconbutton, transform: [{ rotate: '180deg' },{ scaleY: -1 } ] }} size={100} />      
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

function Player2ChangeStance({ route, navigation }) {
  const { player1Stance, player2Stance, player1Move, player1Health, player2Health } = route.params;
  const [Player2Move, setPlayer2Move] = useState(null);

  const changeStance = (stance) => {
    setPlayer2Move(stance);
    navigation.navigate('Battle', { player1Stance, player2Stance, player1Move, player2Move: stance, player1Health, player2Health});
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
        <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
            <Text style={styles.title}>Player 2</Text>
            <View style={styles.healthBarContainer}>
            <View style={{...styles.healthBar, width: `${player2Health}%`}} />
          </View>
          <Text style={styles.instructions}>Your Current Stance: {player2Stance}</Text>
          <Text style={styles.instructions}>Opponents Current Stance: {player1Stance}</Text>
          <TouchableOpacity 
            onPress={() => changeStance('Rock')}
          >
            <FontAwesomeIcon icon={faHandFist} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => changeStance('Paper')}
          >
            <FontAwesomeIcon icon={faHandPaper} style={{ ...styles.iconbutton, transform: [{ rotate: '90deg' }] }} size={100} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => changeStance('Scissors')}
          >
          <FontAwesomeIcon icon={faHandScissors} style={{ ...styles.iconbutton, transform: [{ rotate: '180deg' },{ scaleY: -1 } ] }} size={100} />      
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

function BattleScreen({ route, navigation }) {
  const { player1Stance, player2Stance,player1Move, player2Move, player1Health, player2Health } = route.params;

  if (player1Move === player2Move) {
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
          <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
          <Text style={styles.title}>Its a Tie</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {navigation.navigate('Player1SelectStance', { player1Health, player2Health});}}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  else if(player1Move === 'Rock' && player2Move === 'Scissors' || player1Move === 'Paper' && player2Move === 'Rock' || player1Move === 'Scissors' && player2Move === 'Paper') {
    let message = "";
    let newPlayer2Health = player2Health;
    if (player1Move == player1Stance){  
      newPlayer2Health -= 30;
      message = "Player 1's original stance was used! Player 2 takes 30 damage!";
    }
    else if (player1Move != player1Stance){
      newPlayer2Health -= 15;
      message = "Player 1's original stance was not used! Player 2 takes 15 damage!";
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
          <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
            <Text style={styles.title}>Player One Wins!</Text>
            <Text style={styles.text}>{message}</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => {
                if (player1Health <= 0 || newPlayer2Health <= 0) {
                  navigation.navigate('ResultScreen', { player1Health, player2Health: newPlayer2Health });
                } else {
                  navigation.navigate('Player1SelectStance', { player1Health, player2Health: newPlayer2Health });
                }}}>
            <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  else if(player2Move === 'Rock' && player1Move === 'Scissors' || player2Move === 'Paper' && player1Move === 'Rock' || player2Move === 'Scissors' && player1Move === 'Paper') {
      var message = "";
      let newPlayer1Health = player1Health;
      if (player2Move == player2Stance){  
        newPlayer1Health = player1Health - 30;
        var message = "Player 2's original stance was used! Player 1 takes 30 damage!";
      }
      else if (player2Move != player2Stance){
        newPlayer1Health = player1Health - 15;
        var message = "Player 2's original stance was not used! Player 1 takes 15 damage!";
      }
      return (
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
            <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
              <Text style={styles.title}>Player Two Wins!</Text>
              <Text style={styles.text}>{message}</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                  if (newPlayer1Health <= 0 || player2Health <= 0) {
                    navigation.navigate('ResultScreen', { player1Health: newPlayer1Health, player2Health});
                  } else {
                    navigation.navigate('Player1SelectStance', { player1Health: newPlayer1Health, player2Health});
                  }}}>
              <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.buttonText}>Player 1's Original Stance: {player1Stance}</Text>
        <Text style={styles.buttonText}>Player 2's Original Stance: {player2Stance}</Text>
        <Text style={styles.buttonText}>Player 1's Move: {player1Move}</Text>
        <Text style={styles.buttonText}>Player 2's Move: {player2Move}</Text>
      </ImageBackground>
    </View>
  );
}

function ResultScreen({ route, navigation }) {
  const { player1Health, player2Health } = route.params;

  const winner = player1Health > 0 ? 'Player 1' : 'Player 2';

  const displayPlayer1Health = player1Health > 0 ? player1Health : 0;
  const displayPlayer2Health = player2Health > 0 ? player2Health : 0;

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight * 1.5 }]}>
        <View style={[styles.overlay2, { width: windowWidth, height: windowHeight }]}>
          <View style={styles.healthBarContainer}>
            <View style={{...styles.healthBar, width: `${displayPlayer1Health}%`}} />
          </View>
          <View style={styles.healthBarContainer}>
            <View style={{...styles.healthBar, width: `${displayPlayer2Health}%`}} />
          </View>
          <Text style={styles.title}>{winner} is victorious!</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Go to Home Page</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImages} style={[styles.backgroundImage, { width: windowWidth, height: windowHeight }]}>
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Rock Paper Scissors</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Player1SelectStance', { player1Health: 100, player2Health: 100 });
            }}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Info');
            }}
          >
            <Text style={styles.buttonText}>How to Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Player1SelectStance" component={Player1SelectStance} />
        <Stack.Screen name="Player2SelectStance" component={Player2SelectStance} />
        <Stack.Screen name="Player1ChangeStance" component={Player1ChangeStance} />
        <Stack.Screen name="Player2ChangeStance" component={Player2ChangeStance} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="Battle" component={BattleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}