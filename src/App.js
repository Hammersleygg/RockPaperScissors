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
    width: Dimensions.get('window').width,
    height: 20,
    backgroundColor: '#ccc',
    marginTop: 20,
    justifyContent: 'center',
  },
  healthBar: {
    height: 20,
    backgroundColor: '#50C878',
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

function Player1SelectStance({ navigation }) {
  const [player1Stance, setPlayer1Stance] = useState(null);

  const selectStance = (stance) => {
    setPlayer1Stance(stance);
    navigation.navigate('Player2SelectStance', { player1Stance: stance});
  };

  return (
    <View style={styles.container}>
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
  const { player1Stance } = route.params;
  const [player2Stance, setPlayer2Stance] = useState(null);

  const selectStance = (stance) => {
    setPlayer2Stance(stance);
    navigation.navigate('Player1ChangeStance', { player1Stance, player2Stance: stance });
  };

  return (
    <View style={styles.container}>
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
  const { player1Stance, player2Stance } = route.params;
  const [Player1Move, setPlayer1Move] = useState(null);

  const changeStance = (stance) => {
    setPlayer1Move(stance);
    navigation.navigate('Player2ChangeStance', { player1Stance, player2Stance, player1Move: stance});
  };

  return (
    <View style={styles.container}>
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
  const { player1Stance, player2Stance, player1Move } = route.params;
  const [Player2Move, setPlayer2Move] = useState(null);

  const changeStance = (stance) => {
    setPlayer2Move(stance);
    navigation.navigate('Battle', { player1Stance, player2Stance, player1Move, player2Move: stance});
  };

  return (
    <View style={styles.container}>
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

function BattleScreen({ route }) {
  const { player1Stance, player2Stance,player1Move, player2Move } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Player 1's Original Stance: {player1Stance}</Text>
      <Text style={styles.buttonText}>Player 2's Original Stance: {player2Stance}</Text>
      <Text style={styles.buttonText}>Player 1's Move: {player1Move}</Text>
      <Text style={styles.buttonText}>Player 2's Move: {player2Move}</Text>
      {/* Add logic for determining winner */}
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
        <Stack.Screen name="Battle" component={BattleScreen} />
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
          navigation.navigate('Player1SelectStance');
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
