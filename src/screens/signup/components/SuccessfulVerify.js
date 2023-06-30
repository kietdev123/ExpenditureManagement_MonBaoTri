/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/dist/Entypo';
import auth from '@react-native-firebase/auth';

function SuccessfulVerify({navigation}) {
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  useEffect(() => {
    const handleBackPress = () => {
      if (!backPressedOnce) {
        setBackPressedOnce(true);
        ToastAndroid.showWithGravity(
          'Nhấn thêm lần nữa để thoát',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);
        return true;
      } else {
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [backPressedOnce]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notifications}>Xác nhận Email</Text>
      <View>
        <Text style={styles.text}>Chúc mừng!</Text>
        <Text style={styles.text}>Email của bạn đã được xác nhận!</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('../../../assets/icons/verify-email.png')}
      />
      <TouchableOpacity
        style={styles.buttonResend}
        onPress={() => {
          navigation.replace('Home');
        }}>
        <IconEntypo name="home" size={30} color="#fff" />
        <Text style={styles.textResend}>Đến trang chủ</Text>
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
    height: 120,
    resizeMode: 'contain',
  },
  buttonResend: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#FC6B68',
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

export default SuccessfulVerify;
