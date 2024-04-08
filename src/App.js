import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

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

// Create a stack navigator
const Stack = createStackNavigator();

// Info screen component
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Home screen component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          console.log('Start Game button pressed');
        }}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('Info') // Navigate to the 'Info' screen
        }}
      >
        <Text style={styles.buttonText}>How to Play</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
