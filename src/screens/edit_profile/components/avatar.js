import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
var ImagePicker = require('react-native-image-picker');
import PlusIcon from 'react-native-vector-icons/FontAwesome';

const Avatar = ({inputs, handleAvatarChange}) => {
  const [localSource, setLocalSource] = useState(null);

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
          const uri = response.assets[0].uri;
          console.log('uri', uri);
          setLocalSource({uri: uri});
          handleAvatarChange(uri);
        }
      });
    } catch (error) {
      Alert.alert('Lỗi:', 'Xảy ra lỗi trong khi thay đổi ảnh đại diện.');
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputs.avatarURL) {
      setLocalSource({uri: inputs.avatarURL});
    }
  }, [inputs.avatarURL]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeAvatar}>
        <Image
          source={
            inputs.avatarURL === null
              ? localSource === null
                ? inputs.gender === 'male'
                  ? require('../../../assets/images/male.png')
                  : require('../../../assets/images/female.png')
                : localSource
              : localSource
              ? localSource
              : require('../../../assets/images/male.png')
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changeAvatar}>
          <PlusIcon name="plus" size={18} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
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
