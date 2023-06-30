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
import {showMessage} from 'react-native-flash-message';

const ConfirmResetPassword = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    password: '',
    re_password: '',
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
    if (!inputs.re_password) {
      handleError('Vui lòng nhập mật khẩu xác nhận', 're_password');
      isValid = false;
    } else {
      if (inputs.re_password != inputs.password) {
        handleError('Mật khẩu không khớp!', 're_password');
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
  const [showRePassword, setShowRePassword] = useState(false);
  const handleResetPassword = () => {
    if (validate()) {
      const user = auth().currentUser;
      user
        .updatePassword(inputs.password)
        .then(() => {
          showMessage({
            message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại!',
            type: 'success',
            icon: 'success',
            duration: 2000,
            onHide: () => {
              navigation.replace('Login');
            },
          });
        })
        .catch(error => {
          console.log('Lỗi khi cập nhật mật khẩu:', error);
        });
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
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
            Nhập mật khẩu mới
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Vui lòng nhập mật khẩu mới của bạn
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
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
              style={{flex: 1, alignSelf: 'stretch'}}
              secureTextEntry={!showPassword}
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              placeholder="Mật khẩu"
              error={errors.password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={!showPassword ? 'eye-off' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 10,
                color: COLORS.red,
                fontSize: 12,
              }}>
              {errors.password}
            </Text>
          )}
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
            style={{flex: 1, alignSelf: 'stretch'}}
            secureTextEntry={!showRePassword}
            onChangeText={text => handleOnchange(text, 're_password')}
            onFocus={() => handleError(null, 're_password')}
            placeholder="Nhập lại mật khẩu"
            error={errors.re_password}
          />
          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
            <Icon name={!showRePassword ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>
        {errors.re_password && (
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              color: COLORS.red,
              fontSize: 12,
            }}>
            {errors.re_password}
          </Text>
        )}

        <Button title="Gửi" onPress={handleResetPassword} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ConfirmResetPassword);
