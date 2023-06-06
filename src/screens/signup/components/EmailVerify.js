/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import IconFontisto from 'react-native-vector-icons/dist/Fontisto';
import auth from '@react-native-firebase/auth';

function EmailVerify({navigation}) {
  // Kiểm tra email đã xác thực hay chưa, nếu rồi chuyển hướng đến màn hình thông báo xác thực thành công
  useEffect(() => {
    const checkEmailVerification = setInterval(() => {
      const user = auth().currentUser;
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            clearInterval(checkEmailVerification);
            navigation.navigate('SuccessfulVerify');
          }
        });
      }
    }, 2000);
    setResendDisabled(true);
    setEventCountdown();
    return () => {
      clearInterval(checkEmailVerification);
    };
  }, [navigation]);
  // Ẩn nút gửi lại mỗi 30s
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const handleResendEmail = () => {
    setResendDisabled(true);
    setEventCountdown();
    // Gửi lại email xác thực
    auth()
      .currentUser.sendEmailVerification()
      .catch(error => {
        console.log(
          'Lỗi khi gửi email xác thực ở màn hình EmailVerify:',
          error,
        );
      });
  };
  const setEventCountdown = () => {
    let timeLeft = 30;
    const countdownInterval = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      if (timeLeft === 0) {
        clearInterval(countdownInterval);
        setResendDisabled(false);
        setCountdown(30);
      }
    }, 1000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notifications}>Xác nhận email</Text>
      <Text style={styles.text}>
        Vui lòng kiểm tra email và xác nhận email của bạn!
      </Text>
      <Image
        style={styles.logo}
        source={require('../../../assets/icons/email_icon.png')}
      />
      <TouchableOpacity
        style={[
          styles.buttonResend,
          resendDisabled
            ? {
                backgroundColor: '#A8A8A8',
              }
            : {
                backgroundColor: '#FC6B68',
              },
        ]}
        onPress={handleResendEmail}
        disabled={resendDisabled}>
        <IconFontisto name="email" size={30} color="#fff" />
        {resendDisabled ? (
          <Text style={styles.textResend}>
            Gửi lại email sau {countdown}(s)
          </Text>
        ) : (
          <Text style={styles.textResend}>Gửi lại email</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.buttonCancel}>Hủy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: 'center',
    gap: 5,
  },
  notifications: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ED4032',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
  },
  buttonResend: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    // backgroundColor: '#FC6B68',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  textResend: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonCancel: {
    color: '#6E2DD1',
    marginTop: 20,
  },
});

export default EmailVerify;
