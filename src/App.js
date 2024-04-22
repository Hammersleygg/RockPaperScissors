import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#B7C9E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#50C878',
    width: Dimensions.get('window').width / 1.6,
    height: Dimensions.get('window').height / 15,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: Dimensions.get('window').height / 15,
  },
  buttonText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 22,
  },
  healthBarContainer: {
    width: Dimensions.get('window').width * 0.5, 
    height: 20,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  healthBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

const Stack = createStackNavigator();

function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Info Screen</Text>
    </View>
  );
}

function Player1SelectStance({ route, navigation }) {
  const { player1Health, player2Health } = route.params;
  
  const [player1Stance, setPlayer1Stance] = useState(null);

  const selectStance = (stance) => {
    setPlayer1Stance(stance);
    navigation.navigate('Player2SelectStance', { player1Stance: stance, player1Health, player2Health});
  };

  return (
    <View style={styles.container}>
        <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${player1Health}%`}} />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Rock')}
      >
        <Text style={styles.buttonText}>Rock</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Paper')}
      >
        <Text style={styles.buttonText}>Paper</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Scissors')}
      >
        <Text style={styles.buttonText}>Scissors</Text>
      </TouchableOpacity>
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
      <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${player2Health}%`}} />
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Rock')}
      >
        <Text style={styles.buttonText}>Rock</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Paper')}
      >
        <Text style={styles.buttonText}>Paper</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => selectStance('Scissors')}
      >
        <Text style={styles.buttonText}>Scissors</Text>
      </TouchableOpacity>
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
        <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${player1Health}%`}} />
      </View>
      <Text style={styles.buttonText}>Player 1's Current Stance: {player1Stance}</Text>
      <Text style={styles.buttonText}>Player 2's Current Stance: {player2Stance}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Rock')}
      >
        <Text style={styles.buttonText}>Rock</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Paper')}
      >
        <Text style={styles.buttonText}>Paper</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Scissors')}
      >
        <Text style={styles.buttonText}>Scissors</Text>
      </TouchableOpacity>
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
        <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${player2Health}%`}} />
      </View>
      <Text style={styles.buttonText}>Player 1's Stance: {player1Stance}</Text>
      <Text style={styles.buttonText}>Player 2's Current Stance: {player2Stance}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Rock')}
      >
        <Text style={styles.buttonText}>Rock</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Paper')}
      >
        <Text style={styles.buttonText}>Paper</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => changeStance('Scissors')}
      >
        <Text style={styles.buttonText}>Scissors</Text>
      </TouchableOpacity>
    </View>
  );
}

function BattleScreen({ route, navigation }) {
  const { player1Stance, player2Stance,player1Move, player2Move, player1Health, player2Health } = route.params;

  if (player1Move === player2Move) {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>It's a tie!</Text>
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
        <Text style={styles.buttonText}>Player one Wins!</Text>
        <Text style={styles.buttonText}>{message}</Text>
        <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        if (player1Health <= 0 || newPlayer2Health <= 0) {
          navigation.navigate('ResultScreen', { player1Health, player2Health: newPlayer2Health });
        } else {
          navigation.navigate('Player1SelectStance', { player1Health, player2Health: newPlayer2Health });
        }
      }}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
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
          <Text style={styles.buttonText}>Player one Wins!</Text>
          <Text style={styles.buttonText}>{message}</Text>
          <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        if (newPlayer1Health <= 0 || player2Health <= 0) {
          navigation.navigate('ResultScreen', { player1Health: newPlayer1Health, player2Health});
        } else {
          navigation.navigate('Player1SelectStance', { player1Health: newPlayer1Health, player2Health});
        }
      }}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
        </View>
      );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Player 1's Original Stance: {player1Stance}</Text>
      <Text style={styles.buttonText}>Player 2's Original Stance: {player2Stance}</Text>
      <Text style={styles.buttonText}>Player 1's Move: {player1Move}</Text>
      <Text style={styles.buttonText}>Player 2's Move: {player2Move}</Text>
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
      <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${displayPlayer1Health}%`}} />
      </View>
      <View style={styles.healthBarContainer}>
        <View style={{...styles.healthBar, width: `${displayPlayer2Health}%`}} />
      </View>
      <Text style={styles.text}>{winner} is victorious!</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('Player1SelectStance',  { player1Health: 100, player2Health: 100 });
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
      <StatusBar style="auto" />
    </View>
  );
}

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