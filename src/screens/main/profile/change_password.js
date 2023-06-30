/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-native-redux';

import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Button from '../../signup/components/button.js';
import auth from '@react-native-firebase/auth';

const ChangePassWordScreen = ({navigation}) => {
  const [isFirstSetPass, setIsFirstSetPass] = useState(false);
  const [inputs, setInputs] = useState({
    password: '',
  });
  const [errors, setErrors] = useState({});

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

  const handleSetNewPassword = () => {
    if (validate()) {
      auth()
        .currentUser.updatePassword(inputs.password)
        .then(() => {
          // Mật khẩu đã được cập nhật thành công
          ToastAndroid.showWithGravity(
            'Cập nhật mật khẩu thành công',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.goBack();
          console.log('Password updated successfully');
        })
        .catch(error => {
          console.log('Xảy ra lỗi khi update mật khẩu lần đầu', error);
        });
    }
  };
  useEffect(() => {
    auth()
      .fetchSignInMethodsForEmail(auth().currentUser.email)
      .then(signInMethods => {
        const hasPasswordMethod = signInMethods.includes('password');
        if (hasPasswordMethod) {
          // Email đã có phương thức đăng nhập bằng mật khẩu
          console.log('Email có thể đăng nhập bằng password');
        } else {
          // Email không có phương thức đăng nhập bằng mật khẩu
          setIsFirstSetPass(true);
          console.log('Email không tòn tại phương thức đăng nhập password');
        }
      })
      .catch(error => {
        console.log(
          'Xảy ra lỗi trong quá trình kiểm tra phương thức đăng nhập ở màn hình ChangePassword.',
        );
        console.log(error);
      });
  }, []);
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
            {isFirstSetPass ? 'Đặt mật khẩu' : 'Bạn muốn đổi mật khẩu?'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
              textAlign: 'center',
            }}>
            {isFirstSetPass
              ? 'Đây là lần đặt mật khẩu đầu tiên! Vui lòng nhập tối thiểu 6 ký tự'
              : 'Vui lòng nhập mật khẩu hiện tại của bạn'}
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
        <Button
          title="Gửi"
          onPress={
            isFirstSetPass ? handleSetNewPassword : handleConfirmPassword
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ChangePassWordScreen);
