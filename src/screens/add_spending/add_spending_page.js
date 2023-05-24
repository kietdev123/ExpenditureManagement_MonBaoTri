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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import InputMoney from './components/input_money';
import InputSpending from './components/input_spending';
import ItemSpending from './components/item_spending';
import COLORS from '../../constants/colors';
import DatePicker from 'react-native-date-picker';

const AddSpendingPage = ({navigation}) => {
  const [more, setMore] = useState(false);
  const [money, setMoney] = useState('');

  const [inputs, setInputs] = React.useState({
    money: '',
    location: '',
    note: '',
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setdobLabel] = useState('Ngày');

  const [timeSpending, setTimeSpending] = useState(new Date());
  const [openTimeSpending, setOpenTimeSpending] = useState(false);
  const [dobLabelTimeSpending, setdobLabelTimeSpending] = useState('Giờ');

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

    if (isValid == false) {
      if (dobLabel == 'Ngày') {
        Alert.alert('Vui lòng nhập ngày');
        isValid = false;
        console.log('é');
        // return;
      }

      if (dobLabelTimeSpending == 'Giờ') {
        Alert.alert('Vui lòng nhập giờ');
        isValid = false;
        console.log('é');
        // return;
      }
      if (isValid) {
        console.log(inputs.money);
      }
    }

    console.log('save');
    return isValid;
  };
  const handleOnchange = (text, input) => {
    console.log(text + ' : ' + input);
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const addingSpending = () => {
    // Functionality to save the spending
    let check = validate();
    console.log(check);
    if (check) {
      console.log('money : ' + inputs.money);
      console.log('Date spending : ' + date.toLocaleDateString('vi'));
      console.log('Time spending : ' + date.toLocaleTimeString('vi'));
      console.log('note : ' + inputs.note);
      console.log('location : ' + inputs.location);
      console.log(inputs);
    }
  };

  const addSpending = () => {
    // Functionality to add spending
    return (
      <>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            // setdobLabel(date.toDateString());
            setdobLabel(date.toLocaleDateString('vi'));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          open={openTimeSpending}
          date={timeSpending}
          onConfirm={date => {
            setOpenTimeSpending(false);
            setTimeSpending(date);
            // setdobLabel(date.toDateString());
            setdobLabelTimeSpending(date.getHours() + ':' + date.getMinutes());
          }}
          onCancel={() => {
            setOpenTimeSpending(false);
          }}
        />
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
            onPress={() => {
              navigation.navigate('ChooseTypePage');
            }}>
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
          <ItemSpending
            action={() => setOpen(true)}
            color="#F4831B"
            icon="ios-calendar-outline"
            text={dobLabel}></ItemSpending>
          <Line></Line>

          <ItemSpending
            action={() => setOpenTimeSpending(true)}
            color="#F1BA05"
            icon="time-outline"
            text={dobLabelTimeSpending}></ItemSpending>

          <Line></Line>

          <InputSpending
            onChangeText={text => handleOnchange(text, 'note')}
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
            onChangeText={text => handleOnchange(text, 'location')}
            text={inputs.location}
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Thêm Chi Tiêu</Text>
        <TouchableOpacity onPress={addingSpending}>
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
      <ScrollView>
        <View style={styles.content}>
          {addSpending()}
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

export default AddSpendingPage;
