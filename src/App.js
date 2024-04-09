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
});

const Stack = createStackNavigator();

function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Info Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="SelectMoves" component={SelectMovesScreen} />
        <Stack.Screen name="BattleWinner" component={BattleWinner} />
        <Stack.Screen name="GameWinner" component={GameWinner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('SelectMoves');
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

function SelectMovesScreen({ navigation }) {
  const [selectedMove, setSelectedMove] = useState(null);
  const [isSecondPhase, setIsSecondPhase] = useState(false);

  const moves = ['Rock', 'Paper', 'Scissors'];

  const handleMoveSelection = (move) => {
    setSelectedMove(move);
    if (!isSecondPhase) {
      setIsSecondPhase(true);
    } else {
      navigation.navigate('BattleWinner', { playerMove: selectedMove, enemyMove: getRandomMove() });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>{isSecondPhase ? 'Change your move' : 'Select your move'}</Text>
      {moves.map((move) => (
        <TouchableOpacity
          key={move}
          style={styles.button}
          onPress={() => handleMoveSelection(move)}
        >
          <Text style={styles.buttonText}>{move}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function BattleWinner({ route, navigation }) {
  const { playerMove, enemyMove } = route.params;
  const winner = getWinner(playerMove, enemyMove);

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Your move: {playerMove}</Text>
      <Text style={styles.buttonText}>Enemy move: {enemyMove}</Text>
      <Text style={styles.buttonText}>
        {winner === 'Player' ? 'You win!' : winner === 'Enemy' ? 'You lose!' : 'It\'s a tie!'}
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('GameWinner', { winner });
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function GameWinner({ route, navigation }) {
  const { winner } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>
        {winner === 'Player' ? 'You win the game!' : winner === 'Enemy' ? 'You lose the game!' : 'It\'s a tie!'}
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('SelectMoves');
        }}
      >
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

function getRandomMove() {
  return moves[Math.floor(Math.random() * moves.length)];
}

function getWinner(playerMove, enemyMove) {
  if (playerMove === enemyMove) {
    return 'Tie';
  }

  if (
    (playerMove === 'Rock' && enemyMove === 'Scissors') ||
    (playerMove === 'Paper' && enemyMove === 'Rock') ||
    (playerMove === 'Scissors' && enemyMove === 'Paper')
  ) {
    return 'Player';
  }

  return 'Enemy';
}
