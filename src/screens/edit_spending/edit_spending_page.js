import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import InputMoney from './components/input_money';
import InputSpending from './components/input_spending';
import ItemSpending from './components/item_spending';
import COLORS from '../../constants/colors';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
const EditSpendingPage = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  //TimePicker
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateLabel, setdateLabel] = useState(Date('12-25-1995'));
  const [timeLabel, settimeLabel] = useState(Date('09:15:00'));
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  //
  const [more, setMore] = useState(false);
  const [money, setMoney] = useState('');

  const [inputs, setInputs] = React.useState({
    money: '',
    location: '',
    note: '',
  });
  const [errors, setErrors] = React.useState({});

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    let moneyString = inputs.money.replace(/[^0-9]/g, '');

    if (containsOnlyNumbers(inputs.money) == false) {
      handleError('Vui lòng chỉ nhập kí tự số', 'money');
      isValid = false;
    }

    if (moneyString.length == 0 || moneyString == '0') {
      handleError('Vui lòng nhập số tiền hợp lệ', 'money');
      isValid = false;
    }

    if (isValid) {
      console.log(inputs.money);
    }
  };
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const editingSpending = () => {
    // Functionality to save the spending
    validate();
  };

  const editSpending = () => {
    // Functionality to edit spending
    return (
      <>
        <View
          style={{
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: 'white',
            borderRadius: 20,
            height: 300,
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              paddingBottom: 12,
              paddingTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => {}}>
            {/* <View style={{flex: 1}}></View> */}
            <Image
              source={require('../../assets/icons/question_mark.png')}
              resizeMode="contain"
              style={{width: 35}}
            />
            {/* <View style={{flex: 1}}></View> */}
            <Icon
              color="black"
              name="md-chevron-forward-outline"
              style={{color: 'black', fontSize: 35, marginRight: 10}}
            />
          </TouchableOpacity>

          <Line></Line>
          <DatePicker
            modal
            mode="date"
            open={openDatePicker}
            date={date}
            onConfirm={date => {
              setOpenDatePicker(false);
              setDate(date);
              setdateLabel(date.toDateString());
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
          <ItemSpending
            action={() => setOpenDatePicker(true)}
            color="#F4831B"
            icon="ios-calendar-outline"
            text={Moment(dateLabel).format('DD/MM/YYYY')}></ItemSpending>
          <Line></Line>

          <ItemSpending
            action={() => setOpenTimePicker(true)}
            color="#F1BA05"
            icon="time-outline"
            text={Moment(timeLabel, 'HH:mm:ss [GMT] Z').format(
              'HH:mm:ss',
            )}></ItemSpending>
          <DatePicker
            modal
            mode="time"
            open={openTimePicker}
            date={time}
            onConfirm={time => {
              setOpenTimePicker(false);
              setTime(time);
              settimeLabel(time.toTimeString());
            }}
            onCancel={() => {
              setOpenTimePicker(false);
            }}
          />
          <Line></Line>
          <InputSpending
            color="#DD6000"
            icon="newspaper"
            hintText="Ghi chú"></InputSpending>
        </View>
      </>
    );
  };

  const ImageComponent = () => {
    return (
      <>
        <View style={{height: 36}}></View>
        <View
          style={{
            // paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: 'white',
            borderRadius: 20,
            height: 60,
          }}>
          <View
            style={{
              height: 60,
              paddingBottom: 12,
              paddingTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                color="black"
                name="image-outline"
                style={{color: 'black', fontSize: 24, marginRight: 10}}
              />
            </TouchableOpacity>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: 'black',
              }}>
              <Text></Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Icon
                color="black"
                name="camera-outline"
                style={{color: 'black', fontSize: 24, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const moreFunction = () => {
    // Functionality for more
    return (
      <>
        <View style={{height: 36}}></View>
        <View
          style={{
            // paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: 'white',
            borderRadius: 20,
            height: 200,
          }}>
          <InputSpending
            color="#63C328"
            icon="location-outline"
            hintText="Vị trí"></InputSpending>
          <Line></Line>
          <Text style={{paddingTop: 24}}>Thêm bạn bè</Text>
        </View>
        <ImageComponent></ImageComponent>
        <View style={{height: 36}}></View>
      </>
    );
  };

  const Line = () => {
    return <View style={styles.line} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>Thêm Chi Tiêu</Text>
          <TouchableOpacity onPress={editingSpending}>
            <Text style={styles.save}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <InputMoney
            onChangeText={text => handleOnchange(text, 'money')}
            onFocus={() => handleError(null, 'money')}
            placeholder="100.000 VND"
            error={errors.money}></InputMoney>
        </View>

        <View style={{overflow: 'hidden', paddingBottom: 5}}>
          <View
            style={{
              backgroundColor: '#fff',
              // width: 300,
              height: 1,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 3,
              elevation: 5,
            }}
          />
        </View>

        <View style={styles.content}>
          {editSpending()}
          {more && moreFunction()}
          <TouchableOpacity
            onPress={() => setMore(!more)}
            style={styles.moreButton}>
            <Text style={styles.moreButtonText}>
              {more ? 'Ẩn bớt' : 'Thêm chi tiết'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  save: {
    fontSize: 16,
    color: 'blue',
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  moreButton: {
    height: 40,
    // backgroundColor: '#eeeeee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginEnd: 10,
    marginStart: 10,
  },
});

export default EditSpendingPage;
