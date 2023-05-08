import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkFirstTime() {
  try {
    const value = await AsyncStorage.getItem('@first_time');
    if (value === null) {
      await AsyncStorage.setItem('@first_time', 'true');
      return true; // Lần đầu tiên mở ứng dụng
    } else {
      return false; // Không phải lần đầu tiên mở ứng dụng
    }
  } catch (error) {
    console.log(error);
    return false; // Lỗi xảy ra, giả định không phải lần đầu tiên mở ứng dụng
  }
}
const WhiteBoarding = () => {
  const navigation = useNavigation();

  const [isFirstTime, setIsFirstTime] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const isFirstTimeResult = await checkFirstTime();
      setIsFirstTime(isFirstTimeResult);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isFirstTime) {
      navigation.navigate('Onboarding');
    } else if (isFirstTime === false) {
      navigation.navigate('Login');
    }
  }, [isFirstTime, navigation]);
  return <View />;
};

export default WhiteBoarding;
