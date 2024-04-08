import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

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

export default function App() {
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
          console.log('How to Play button pressed');
        }}
      >
        <Text style={styles.buttonText}>How to Play</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}