import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [gaugeReading, setGaugeReading] = useState<number | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg', // Adjust if needed
      name: 'gauge.jpg',
    });

    try {
      const response = await axios.post('http://192.168.135.102:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setGaugeReading(response.data.reading);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      {gaugeReading !== null && <Text>Gauge Reading: {gaugeReading}</Text>}
    </View>
  );
};

export default App;
