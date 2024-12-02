import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const FilePhotoUploader = () => {
  const [fileResponse, setFileResponse] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  // Function to pick a file
  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFileResponse(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No file was selected.');
      } else {
        Alert.alert('Error', 'Something went wrong while picking the file.');
      }
    }
  };

  // Function to pick a photo
  const handlePhotoUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'No photo was selected.');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Something went wrong while picking the photo.');
      } else {
        const uri = response.assets?.[0]?.uri;
        setPhotoUri(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Files and Photos</Text>
      <Button title="Upload File" onPress={handleFileUpload} />
      {fileResponse && (
        <Text style={styles.fileInfo}>
          Selected File: {fileResponse.name || 'Unknown'}
        </Text>
      )}
      <View style={styles.spacing} />
      <Button title="Upload Photo" onPress={handlePhotoUpload} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacing: {
    height: 20,
  },
  fileInfo: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default FilePhotoUploader;
