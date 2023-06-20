/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  ScrollView,
  Image,
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
import Input from '../../signup/components/input.js';
import Button from '../../signup/components/button.js';

const ChangePassWordScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    password: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    }
    if (isValid == true) {
      navigation.navigate('Login');
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" style={{color: 'black', fontSize: 28}} />
        </TouchableOpacity>

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
            Bạn muốn đổi mật khẩu?
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '300',
              color: 'black',
              paddingBottom: 30,
            }}>
            Vui lòng nhập mật khẩu hiện tại của bạn
          </Text>
        </View>

        {/* <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          placeholder="Mật khẩu"
          error={errors.password}
        /> */}
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

        <Button title="Gửi" onPress={validate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(ChangePassWordScreen);
