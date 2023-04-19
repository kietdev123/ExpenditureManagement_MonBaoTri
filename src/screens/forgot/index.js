import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-native-redux';

import COLORS from '../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../signup/components/input.js';
import Button from '../signup/components/button.js';

const ForgotScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    fullname: '',
    email: '',
    gender: '',
    dateofbirth: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Vui lòng nhập email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Hãy nhập email hợp lệ', 'email');
      isValid = false;
    }

    if (isValid == true) {
      navigation.navigate('EmailVerify');
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="arrow-back" style={{color: 'black', fontSize: 28}} />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Quên mật khẩu
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Đừng lo! Nó xảy ra. Vui lòng nhập địa chỉ email với tài khoản của
            ban!
          </Text>
        </View>

        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          placeholder="Email"
          error={errors.email}
        />

        <Button title="Gửi" onPress={validate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ForgotScreen);
