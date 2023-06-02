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
import DatePicker from 'react-native-date-picker';
import Input from './components/input.js';
import COLORS from '../../constants/colors.js';
import Button from './components/button.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Avatar from './components/avatar.js';
const EditProfilePage = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    fullname: '',
    moneyRange: '',
    gender: '',
    dateofbirth: '',
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

    navigation.navigate('EmailVerify');
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
  const [isMale, setIsMale] = useState(true);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingHorizontal: 20}}>
        <View
          style={{
            paddingBottom: 30,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar></Avatar>
        </View>
        {/* <Avatar avatarSource="../../assets/images/vietnam.png"></Avatar> */}
        <Text style={{fontWeight: 'bold'}}>Họ và tên</Text>
        <Input
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          placeholder="Họ tên"
          error={errors.fullname}
        />
        <Text style={{fontWeight: 'bold'}}>Tiền hằng tháng</Text>
        <Input
          onChangeText={text => handleOnchange(text, 'moneyRange')}
          onFocus={() => handleError(null, 'moneyRange')}
          placeholder="Tiền hằng tháng"
          error={errors.fullname}
        />
        <Text style={{fontWeight: 'bold'}}>Ngày sinh</Text>
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
        <View style={{paddingLeft: 5}}>
          <Text style={{marginVertical: 10, fontWeight: '700', fontSize: 20}}>
            Giới tính
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsMale(true);
            }}
            activeOpacity={1}>
            <View
              style={[
                isMale ? styles.isSelected : '',
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
              setIsMale(false);
            }}
            activeOpacity={1}>
            <View
              style={[
                !isMale ? styles.isSelected : '',
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
        <Button title="Lưu" onPress={validate} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 20,
            justifyContent: 'center',
          }}
        />
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

export default EditProfilePage;
