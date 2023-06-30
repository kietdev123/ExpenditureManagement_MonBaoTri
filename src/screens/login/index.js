/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-native-redux';
import COLORS from '../../constants/colors.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../signup/components/input.js';
import Button from '../signup/components/button.js';
import TextContinue from './components/text_continue.js';
import Spinner from 'react-native-loading-spinner-overlay';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
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

    if (!inputs.email) {
      handleError('Vui lòng nhập email', 'email');
      return false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Hãy nhập email hợp lệ!', 'email');
      return false;
    }

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      return false;
    } else if (inputs.password.length < 5) {
      handleError('Mật khẩu quá ngắn!', 'password');
      return false;
    }
    return true;
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  // Xử lý sự kiện đăng nhập bằng email và password
  const [loginError, setLoginError] = useState('');
  const handleLogin = () => {
    setLoginError('');
    // kiểm tra email và password có hợp lệ hay chưa
    if (validate()) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(inputs.email, inputs.password)
        .then(userCredential => {
          // lưu thông tin người dùng nếu đăng nhập thành công
          const user = userCredential.user;
          if (!user.emailVerified) {
            Alert.alert(
              'Thông báo',
              'Vui lòng xác thực email',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    user
                      .sendEmailVerification()
                      .then(() => {
                        // Chuyển đến trang đợi xác thực
                        navigation.navigate('EmailVerify');
                      })
                      .catch(error => {
                        console.log(
                          'Lỗi khi gửi email xác thực ở màn hình Login:',
                          error,
                        );
                      });
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            console.log('Đăng nhập thành công, user hiện tại: ', user);
            navigation.navigate('Home');
          }
          setIsLoading(false);
        })
        .catch(error => {
          // Kiểm tra lỗi trả về
          if (error.code === 'auth/wrong-password') {
            setLoginError('Mật khẩu không đúng');
            console.log('Mật khẩu không đúng');
          } else if (error.code === 'auth/user-not-found') {
            setLoginError('Email không tồn tại');
          } else {
            setLoginError('Lỗi đăng nhập: ' + error);
          }
          setIsLoading(false);
        });
    }
  };
  // Xử lý sự kiện đăng nhập bằng tài khoản Google
  const handleGoogleLogin = async () => {
    // Yêu cầu người dùng đăng nhập bằng Google
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth()
        .signInWithCredential(googleCredential)
        .then(userCredential => {
          const user = userCredential.user;
          const {uid, displayName, photoURL} = user;
          firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then(documentSnapshot => {
              if (!documentSnapshot.exists) {
                // Người dùng chưa được thiết lập thông tin trước đó
                const userData = {
                  fullname: displayName ? displayName : '',
                  moneyRange: 0,
                  gender: 'male',
                  dateofbirth: moment().format('YYYY-MM-DD').toString(),
                  avatarURL: photoURL,
                };

                // Lưu trữ thông tin người dùng vào Firestore
                firestore()
                  .collection('users')
                  .doc(uid)
                  .set(userData)
                  .then(() => {
                    console.log(
                      'Thông tin người dùng ban đầu đã được thiết lập thành công.',
                    );
                  })
                  .catch(error => {
                    console.log('Lỗi khi lưu trữ thông tin người dùng:', error);
                  });
              }
            })
            .catch(error => {
              console.log('Lỗi khi kiểm tra thông tin người dùng:', error);
            });
          console.log('Thông tin người dùng:', user);
          navigation.replace('Home');
        })
        .catch(error => {
          Alert.alert('Đăng nhập thất bại', 'Lỗi: ' + error.message);
        });
    } else {
      Alert.alert(
        'Thông báo',
        'Google Play Services chưa được cài đặt hoặc không khả dụng',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
      );
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '452597848432-p4li0pnjo58p6b8h4bv1pg0ki6adiqsi.apps.googleusercontent.com',
    });
  });

  // Xử lý sự kiện đăng nhập bằng tài khoản Facebook
  const handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      return;
    } else {
      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
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

        {loginError !== '' && (
          <View style={{padding: 5}}>
            <Text style={{color: 'red'}}>{loginError}</Text>
          </View>
        )}

        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
            <Text style={{color: '#16d5f2'}}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <Button title="Đăng nhập" onPress={handleLogin} />

        <TextContinue></TextContinue>

        <View
          style={{
            flexDirection: 'row',
            gap: 30,
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={handleGoogleLogin}
            style={{
              height: 50,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Image
              source={require('../../assets/logo/google_logo.png')}
              resizeMode="contain"
              style={{width: 20}}
            />
            <Text style={{color: '#7d7d7d', marginLeft: 10}}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFacebookLogin}
            style={{
              height: 50,
              backgroundColor: '#4270b2',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Icon
              name="logo-facebook"
              style={{color: 'white', fontSize: 20, marginRight: 10}}
            />
            <Text style={{color: 'white', marginLeft: 10}}>Facebook</Text>
          </TouchableOpacity>
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
