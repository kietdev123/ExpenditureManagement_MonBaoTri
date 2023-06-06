/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-native-redux';
import DatePicker from 'react-native-date-picker';
import Input from './components/input.js';
import COLORS from '../../constants/colors.js';
import Button from './components/button.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    fullname: '',
    email: '',
    gender: 'male',
    dateOfBirth: new Date(),
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = React.useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
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

    if (!inputs.fullname) {
      handleError('Vui lòng nhập họ tên', 'fullname');
      isValid = false;
    }

    if (!inputs.gender) {
      handleError('Vui lòng chọn giới tính', 'gender');
      isValid = false;
    }
    if (!inputs.dateOfBirth) {
      handleError('Vui lòng chọn ngày sinh', 'dateOfBirth');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Mật khẩu quá ngắn', 'password');
      isValid = false;
    }
    if (inputs.password !== inputs.passwordConfirm) {
      handleError('Mật khẩu không khớp', 'password');
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

  // Xử lý sự kiện khi nhấn nút đăng kí
  const [loginError, setLoginError] = useState('');
  const handleSignUp = async () => {
    setLoginError('');
    if (validate()) {
      try {
        const signInMethods = await auth().fetchSignInMethodsForEmail(
          inputs.email,
        );
        if (signInMethods.length > 0) {
          setLoginError('Email đã được đăng kí tài khoản!');
          return;
        } else {
          // Tiến hành gửi dữ liệu đăng kí tài khoản đến firebase
          try {
            auth()
              .createUserWithEmailAndPassword(inputs.email, inputs.password)
              .then(userCredential => {
                const user = userCredential.user;
                const additionalUserInfo = {
                  fullname: inputs.fullname,
                  dateOfBirth: inputs.dateOfBirth,
                  gender: inputs.gender,
                };
                user.updateProfile(additionalUserInfo).catch(error => {
                  console.log('Lỗi khi cập nhật thông tin bổ sung:', error);
                });
                // Đã đăng nhập
                console.log('Đăng ký thành công:', user);
                sendVerificationEmail(user);
              });
          } catch (error) {
            console.log('Lỗi khi đăng ký:', error);
          }
        }
      } catch (error) {
        console.log('Lỗi khi gửi yêu cầu đăng kí tài khoản mới:', error);
      }
    }
  };
  //  Gửi email xác thực
  const sendVerificationEmail = user => {
    user
      .sendEmailVerification()
      .then(() => {
        // Chuyển đến trang đợi xác thực
        navigation.navigate('EmailVerify');
      })
      .catch(error => {
        console.log('Lỗi khi gửi email xác thực ở màn hình Signup:', error);
      });
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
          <Text style={{fontSize: 28, fontWeight: 'bold', color: 'black'}}>
            Chào người dùng mới!
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Chào mừng bạn đến với ứng dụng
          </Text>
        </View>
        {/* Họ tên */}
        <Input
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          placeholder="Họ tên"
          error={errors.fullname}
        />
        {/* Email */}
        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          placeholder="Email"
          error={errors.email}
        />
        {loginError !== '' && (
          <View style={{padding: 5}}>
            <Text style={{color: 'red'}}>{loginError}</Text>
          </View>
        )}
        {/* Giới tính */}
        <View
          style={{
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              setInputs({
                ...inputs,
                gender: 'male',
              });
            }}
            activeOpacity={1}>
            <View
              style={[
                inputs.gender === 'male' ? styles.isSelected : '',
                {
                  alignItems: 'center',
                  padding: 10,
                },
              ]}>
              <Text style={{marginBottom: 10, fontWeight: '700'}}>Nam</Text>
              <Image
                source={require('../../assets/images/male.png')}
                style={{width: 100, height: 100}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInputs({
                ...inputs,
                gender: 'female',
              });
            }}
            activeOpacity={1}>
            <View
              style={[
                inputs.gender === 'female' ? styles.isSelected : '',
                {
                  alignItems: 'center',
                  padding: 10,
                },
              ]}>
              <Text style={{marginBottom: 10, fontWeight: '700'}}>Nữ</Text>
              <Image
                source={require('../../assets/images/female.png')}
                style={{width: 100, height: 100}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Ngày sinh */}
        <TouchableOpacity activeOpacity={1} onPress={() => setOpen(true)}>
          <View
            style={{
              paddingHorizontal: 5,
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 55,
              borderColor: COLORS.light,
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              borderWidth: 0.5,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 14, marginLeft: 10}}>
              {moment(inputs.dateOfBirth).format('DD/MM/YYYY').toString()}
            </Text>
            <Icon
              onPress={() => setOpen(true)}
              name={'calendar-outline'}
              style={{color: 'black', fontSize: 22, marginRight: 10}}
            />
          </View>
        </TouchableOpacity>

        {/* Ngày sinh */}
        <DatePicker
          modal
          mode="date"
          maximumDate={new Date()}
          timeZoneOffsetInMinutes={7}
          open={open}
          date={new Date(inputs.dateOfBirth)}
          onConfirm={date => {
            setOpen(false);
            setInputs({
              ...inputs,
              dateOfBirth: date,
            });
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {/* Mật khẩu */}
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          placeholder="Mật khẩu"
          error={errors.password}
          password
        />
        <Input
          onChangeText={text => handleOnchange(text, 'passwordConfirm')}
          onFocus={() => handleError(null, 'passwordConfirm')}
          iconName="lock-outline"
          placeholder="Xác nhận mật khẩu"
          error={errors.passwordConfirm}
          password
        />
        <Button title="Đăng ký" onPress={handleSignUp} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'center',
          }}>
          <Text> Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#16d5f2'}}> Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  isSelected: {
    borderRadius: 10,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});

export default connect(SignupScreen);
