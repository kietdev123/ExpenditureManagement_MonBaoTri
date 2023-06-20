import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
var ImagePicker = require('react-native-image-picker');
import PlusIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const Avatar = () => {
  const [avatarSource, setAvatarSource] = useState(
    require('../../../assets/images/male.png'),
  );

  const changeAvatar = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 1,
      };
      ImagePicker.launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error:', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button:', response.customButton);
        } else {
          console.log(response);

          // Upload the image to Firebase Cloud Firestore storage
          // const response = await fetch(uri);
          // const blob = await response.blob();
          // const storageRef = firebase
          //   .storage()
          //   .ref()
          //   .child(`avatars/avatar_${Date.now()}`);
          // await storageRef.put(blob);

          // // Get the download URL of the uploaded image
          // const downloadURL = await storageRef.getDownloadURL();

          // // Save the download URL in Firebase Realtime Database
          // firebase.database().ref('avatars').set({
          //   avatarURL: downloadURL,
          // });
          setAvatarSource(response.uri);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'An error occurred while changing the avatar.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={changeAvatar}>
        <Image source={avatarSource} style={styles.avatar} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changeAvatar}>
            <PlusIcon name="plus" size={18} color={'white'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1788E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;
