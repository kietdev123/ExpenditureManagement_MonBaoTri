/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-native-redux';

import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Button from '../../signup/components/button.js';
import auth from '@react-native-firebase/auth';

const ChangePassWordScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    password: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    } else {
      if (inputs.password.length < 6) {
        handleError('Mật khẩu quá ngắn!', 'password');
        isValid = false;
      }
    }
    return isValid;
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleConfirmPassword = () => {
    if (validate()) {
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        inputs.password,
      );
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          navigation.navigate('ConfirmResetPassword');
        })
        .catch(error => {
          handleError('Mật khẩu không đúng', 'password');
        });
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 20,
            }}>
            Bạn muốn đổi mật khẩu?
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Vui lòng nhập mật khẩu hiện tại của bạn
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <TextInput
            autoCorrect={false}
            style={{color: COLORS.black, flex: 1, marginLeft: 10}}
            secureTextEntry={!showPassword}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            placeholder="Mật khẩu"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={!showPassword ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              color: COLORS.red,
              fontSize: 12,
            }}>
            {errors.password}
          </Text>
        )}
        <Button title="Gửi" onPress={handleConfirmPassword} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ChangePassWordScreen);
