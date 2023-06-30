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
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Input from './components/input.js';
import COLORS from '../../constants/colors.js';
import Button from './components/button.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Avatar from './components/avatar.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import md5 from 'react-native-md5';

const EditProfilePage = ({navigation}) => {
  const formatter = new Intl.NumberFormat('en-US');
  const currentUser = auth().currentUser;
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = React.useState({});
  const [avatarURI, setAvatarURI] = useState(null);
  const [inputs, setInputs] = React.useState({
    fullname: '',
    moneyRange: '0',
    gender: '',
    dateofbirth: new Date(),
    avatarURL: null,
  });
  const handleAvatarChange = uri => {
    setAvatarURI(uri);
  };

  const handleUploadAvatar = async () => {
    if (avatarURI) {
      try {
        const uploadUri =
          Platform.OS === 'ios' ? avatarURI.replace('file://', '') : avatarURI;
        const hash = await calculateFileHash(uploadUri);
        const storageRef = storage().ref(`avatars/${hash}`);

        storageRef
          .getDownloadURL()
          .then(downloadURL => {
            return downloadURL;
          })
          .catch(() => {
            storageRef
              .putFile(uploadUri)
              .then(() => {
                return storageRef.getDownloadURL();
              })
              .then(downloadURL => {
                return downloadURL;
              });
          });

        // Image doesn't exist, proceed with uploading
        await storageRef.putFile(uploadUri);
        const downloadURL = await storageRef.getDownloadURL();
        return downloadURL;
      } catch (error) {
        throw new Error('Lỗi khi upload avatar: ' + error.message);
      }
    }
  };

  const calculateFileHash = async filePath => {
    const fileData = await RNFS.readFile(filePath, 'base64');
    return md5.hex_md5(fileData);
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname || inputs.fullname === '') {
      handleError('Vui lòng nhập họ tên', 'fullname');
      isValid = false;
    }

    if (!inputs.moneyRange || inputs.moneyRange === 0) {
      handleError('Vui lòng nhập số tiền', 'moneyRange');
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
    return isValid;
  };
  const handleOnchange = (text, input) => {
    if (input === 'moneyRange') {
      const formattedValue = text.replace(/\D/g, '');
      setInputs({...inputs, moneyRange: formattedValue});
    } else {
      setInputs({
        ...inputs,
        [input]: text,
      });
    }
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleUpdateProfile = async () => {
    if (validate()) {
      if (currentUser) {
        const {uid} = currentUser;

        try {
          const downloadURL =
            avatarURI == null ? inputs.avatarURL : await handleUploadAvatar();

          // Cập nhật thông tin
          const userDataToUpdate = {
            fullname: inputs.fullname,
            moneyRange: inputs.moneyRange,
            gender: inputs.gender,
            dateofbirth: moment(inputs.dateofbirth)
              .format('YYYY-MM-DD')
              .toString(),
            avatarURL: downloadURL,
          };

          await firestore()
            .collection('users')
            .doc(uid)
            .update(userDataToUpdate);

          showMessage({
            message: 'Cập nhật thông tin thành công',
            type: 'success',
            icon: 'success',
            duration: 1000,
            onHide: () => {
              navigation.goBack();
            },
          });

          console.log('Thông tin người dùng đã được cập nhật thành công.');
        } catch (error) {
          console.log('Lỗi khi cập nhật thông tin người dùng:', error);
        }
      }
    }
  };
  useEffect(() => {
    if (currentUser) {
      const {uid} = currentUser;
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            console.log('documentSnapshot:', userData);
            setInputs({
              fullname: userData.fullname,
              moneyRange: userData.moneyRange,
              gender: userData.gender,
              dateofbirth: moment(userData.dateofbirth),
              avatarURL: userData.avatarURL,
            });
          } else {
            setInputs({
              fullname: null,
              moneyRange: null,
              gender: null,
              dateofbirth: null,
            });
            console.log('Không tìm thấy thông tin người dùng.');
          }
        })
        .catch(error => {
          console.log('Lỗi khi lấy thông tin người dùng:', error);
        });
    } else {
      showMessage({
        message:
          'Người dùng chưa đăng nhập. Vui lòng thoát ra và đăng nhập lại!',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('inputs:', inputs);
  }, [inputs]);

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
          <Avatar inputs={inputs} handleAvatarChange={handleAvatarChange} />
        </View>
        <Text style={{fontWeight: 'bold'}}>Họ và tên</Text>
        <Input
          value={inputs.fullname}
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          placeholder="Họ tên"
          error={errors.fullname}
        />
        <Text style={{fontWeight: 'bold'}}>Tiền hằng tháng</Text>
        <Input
          value={formatter.format(inputs.moneyRange)}
          keyboardType="numeric"
          onChangeText={text => handleOnchange(text, 'moneyRange')}
          onFocus={() => handleError(null, 'moneyRange')}
          placeholder="Tiền hằng tháng"
          error={errors.moneyRange}
        />
        <Text style={{fontWeight: 'bold'}}>Ngày sinh</Text>

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
              {moment(inputs.dateofbirth).format('DD/MM/YYYY').toString()}
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
          open={open}
          date={new Date(inputs.dateofbirth)}
          onConfirm={date => {
            setOpen(false);
            setInputs({
              ...inputs,
              dateofbirth: date,
            });
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
        <Button title="Lưu" onPress={handleUpdateProfile} />
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
