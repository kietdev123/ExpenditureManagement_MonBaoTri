/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-native-redux';
import COLORS from '../../constants/colors.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../signup/components/input.js';
import Button from '../signup/components/button.js';
import auth from '@react-native-firebase/auth';

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
      handleError('Vui lòng nhập email!', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Hãy nhập email hợp lệ!', 'email');
      isValid = false;
    }

    return isValid;

    // if (isValid == true) {
    //   navigation.navigate('EmailVerify');
    // }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  //Sự kiện gửi token quên mật khẩu
  const [forgotError, setForgotError] = useState('');
  const handleForgot = async () => {
    setForgotError('');

    if (validate()) {
      try {
        const signInMethods = await auth().fetchSignInMethodsForEmail(
          inputs.email,
        );
        if (signInMethods.length > 0) {
          await auth().sendPasswordResetEmail(inputs.email);
          Alert.alert(
            'Thông báo',
            'Liên kết đặt lại mật khẩu đã được gửi cho bạn. Vui lòng kiểm tra email và tiến hành đặt lại mật khẩu.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('Login');
                },
              },
            ],
          );
        } else {
          setForgotError('Email chưa đăng kí tài khoản!');
        }
      } catch (error) {
        console.log('Lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
      }
    }
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
              fontSize: 18,
              color: 'black',
              paddingTop: 20,
              paddingBottom: 30,
              textAlign: 'center',
            }}>
            Đừng lo! Nó xảy ra. Vui lòng nhập địa chỉ email với tài khoản của
            bạn!
          </Text>
        </View>

        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          placeholder="Email"
          error={errors.email}
        />
        {forgotError !== '' && (
          <View style={{padding: 5}}>
            <Text style={{color: 'red'}}>{forgotError}</Text>
          </View>
        )}
        <Button title="Gửi" onPress={handleForgot} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ForgotScreen);
