import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { Button, Text, Snackbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';

const App = () => {
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [gaugeReading, setGaugeReading] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      simulateGaugeReading();
    }
  };

  const simulateGaugeReading = () => {
    if (!minValue || !maxValue) {
      setErrorMessage('Please enter both min and max values.');
      return;
    }

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (isNaN(min) || isNaN(max) || min >= max) {
      setErrorMessage('Invalid min or max value. Ensure min < max and both are numbers.');
      return;
    }

    // Generate a mock reading between min and max
    const mockReading = (Math.random() * (max - min) + min).toFixed(2);
    setGaugeReading(Number(mockReading));
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Enter Min Value"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            style={styles.input}
            value={minValue}
            onChangeText={setMinValue}
          />
          <TextInput
            placeholder="Enter Max Value"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            style={styles.input}
            value={maxValue}
            onChangeText={setMaxValue}
          />
          <Button mode="contained" onPress={pickImage} style={styles.button}>
            Pick an Image
          </Button>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          {gaugeReading !== null && (
            <Text style={styles.resultText}>Gauge Reading: {gaugeReading}</Text>
          )}
          <Snackbar
            visible={!!errorMessage}
            onDismiss={() => setErrorMessage(null)}
            style={styles.snackbar}
          >
            {errorMessage}
          </Snackbar>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6f61',
    width: '80%',
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#e74c3c',
  },
});

export default App;
