import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import COLORS from '../../../constants/colors';
import Button from '../../signup/components/button';

const ChangePassWordScreen = ({navigation}) => {
  const [isFirstSetPass, setIsFirstSetPass] = useState(false);
  const [inputs, setInputs] = useState({password: ''});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    auth()
      .fetchSignInMethodsForEmail(auth().currentUser.email)
      .then(signInMethods => {
        const hasPasswordMethod = signInMethods.includes('password');
        if (hasPasswordMethod) {
          console.log('Email có thể đăng nhập bằng password');
        } else {
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

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError('Mật khẩu quá ngắn!', 'password');
      isValid = false;
    }

    return isValid;
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

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
        .catch(() => {
          handleError('Mật khẩu không đúng', 'password');
        });
    }
  };

  const handleSetNewPassword = () => {
    if (validate()) {
      auth()
        .currentUser.updatePassword(inputs.password)
        .then(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.flexContainer}>
          <Text style={styles.title}>
            {isFirstSetPass ? 'Đặt mật khẩu' : 'Bạn muốn đổi mật khẩu?'}
          </Text>
          <Text style={styles.subtitle}>
            {isFirstSetPass
              ? 'Đây là lần đặt mật khẩu đầu tiên! Vui lòng nhập tối thiểu 6 ký tự'
              : 'Vui lòng nhập mật khẩu hiện tại của bạn'}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            placeholder="Mật khẩu"
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon name={!showPassword ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    paddingBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    color: COLORS.black,
    flex: 1,
    marginLeft: 10,
  },
  eyeIconContainer: {
    marginLeft: 10,
  },
  errorText: {
    marginLeft: 10,
    marginTop: 5,
    color: COLORS.red,
    fontSize: 12,
  },
  flexContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
});

export default ChangePassWordScreen;
