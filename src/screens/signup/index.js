import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-native-redux';
import DatePicker from 'react-native-date-picker';
import Input from './components/input.js';
import COLORS from '../../constants/colors.js';
import Button from './components/button.js';
import Icon from 'react-native-vector-icons/Ionicons.js';

const SignupScreen = () => {
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
      handleError('Vui lòng chọn giới tính', 'phone');
      isValid = false;
    }
    if (!inputs.dateofbirth) {
      handleError('Vui lòng chọn ngày sinh', 'dateofbirth');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Mật khẩu quá ngắn', 'password');
      isValid = false;
    }
    if (inputs.password != inputs.passwordConfirm) {
      handleError('Mật khẩu không khớp', 'password');
      isValid = false;
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setdobLabel] = useState('Ngày sinh');
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
        <Input
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          placeholder="Họ tên"
          error={errors.fullname}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          placeholder="Email"
          error={errors.email}
        />
        <View
          style={{
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{marginVertical: 10, fontWeight: '700'}}>Nam</Text>
            <Image
              source={require('../../assets/images/male.png')}
              style={{width: 100, height: 100, marginBottom: 10}}
              resizeMode="contain"></Image>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{marginVertical: 10, fontWeight: '700'}}>Nữ</Text>
            <Image
              source={require('../../assets/images/female.png')}
              style={{width: 100, height: 100, marginBottom: 10}}
              resizeMode="contain"></Image>
          </View>
        </View>
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
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{fontSize: 14, marginLeft: 10}}>{dobLabel}</Text>
          </TouchableOpacity>
          <Icon
            onPress={() => setOpen(true)}
            name={'calendar-outline'}
            style={{color: 'black', fontSize: 22, marginRight: 10}}
          />
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setdobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          placeholder="Mật khẩu"
          error={errors.password}
          password
        />
        <Input
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          placeholder="Mật khẩu xác nhận"
          error={errors.passwordConfirm}
          password
        />
        <Button title="Đăng ký" onPress={validate} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'center',
          }}>
          <Text> Đã có tài khoản ?</Text>
          <TouchableOpacity>
            <Text style={{color: '#16d5f2'}}> Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(SignupScreen);
