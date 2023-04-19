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
import TextContinue from './components/text_continue.js';

const LoginScreen = ({navigation}) => {
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

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Mật khẩu quá ngắn', 'password');
      isValid = false;
    }

    if (isValid == true) {
      navigation.navigate('Home');
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
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Chào mừng trở lại!
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Chào mừng trở lại bạn đã bị bỏ lỡ!
          </Text>
        </View>

        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          placeholder="Email"
          error={errors.email}
        />

        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          placeholder="Mật khẩu"
          error={errors.password}
          password
        />

        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#16d5f2'}}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <Button title="Đăng nhập" onPress={validate} />

        <TextContinue></TextContinue>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                height: 50,
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/logo/google_logo.png')}
                resizeMode="contain"
                style={{width: 20}}
              />
              <Text style={{color: '#7d7d7d', marginLeft: 10}}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: 30}} />
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                height: 50,
                backgroundColor: '#4270b2',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon
                name="logo-facebook"
                style={{color: 'white', fontSize: 20, marginRight: 10}}
              />
              <Text style={{color: 'white', marginLeft: 10}}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'center',
          }}>
          <Text> Đã có tài khoản ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#16d5f2'}}> Đăng kí ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(LoginScreen);
