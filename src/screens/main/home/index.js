import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {connect, setStateForKey} from 'react-native-redux';
import {useIsFocused} from '@react-navigation/native';
import COLORS from '../../../constants/colors.js';
import Icon from 'react-native-vector-icons/Ionicons.js';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {listType} from './components/list_type.js';
import {AppBar, Home_Body, Loading_Body} from './components/components.js';

const HomeScreen = ({navigation}) => {
  const [profile, setProfile] = useState({
    avatarURL: '',
    fullname: '',
    moneyRange: '0',
    gender: 'male',
  });
  const currentUser = auth().currentUser;

  const [limitSpendingToday, setLimitSpendingToday] = useState(-1);

  const isFocused = useIsFocused();

  const flatlistRef = useRef(null);
  let scrollRef = useRef(null);

  const [inputValue, setInputValue] = useState(1000000);
  const [outputValue, setOutputValue] = useState(0);

  const [loading, setLoading] = useState(true);

  const [spendings, setSpendings] = useState([]);
  const [spendingsOrigin, setSpendingsOrigin] = useState([]);

  const [_monthSelected, setMonthSelected] = useState(18);
  const [refFlatList, setRefFlatList] = useState();
  const [months, setMonths] = useState([]);

  const ref = firestore().collection('spendings');

  function filter(_month, origin, _valueInput) {
    console.log(_month);
    var temp_spendings = [];
    var temp_output_value = _valueInput;

    for (var index in origin) {
      var item = origin[index];

      var date = new Date(item.dateTime.toDate());
      console.log([_month, date]);
      if (_month.getMonth() === date.getMonth()) {
        temp_spendings.push(item);
        temp_output_value += item.money;
      }
    }
    setOutputValue(temp_output_value);
    console.log(temp_spendings);
    setSpendings(temp_spendings);
    if (limitSpendingToday === -1) {
    }
    var today = new Date();
    var numDateOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    setLimitSpendingToday(
      temp_output_value / (numDateOfThisMonth - (today.getDate() - 1)),
    );
  }

  useEffect(() => {
    console.log('Home redener');
    var now = new Date();

    var next_month = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    var temp_months = [now, next_month];
    for (var i = 1; i < 19; i++) {
      var current = new Date();
      current.setMonth(now.getMonth() - i);
      temp_months.unshift(current);
    }

    setMonths(temp_months);
    setLoading(true);
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {money, dateTime, note, type, typeName, location, friend, image} =
          doc.data();
        list.push({
          id: doc.id,
          money,
          dateTime,
          note,
          type,
          typeName,
          location,
          friend,
          image,
        });
      });
      setSpendingsOrigin(list);

      if (currentUser) {
        // setLoading(true);
        const {uid} = currentUser;
        firestore()
          .collection('users')
          .doc(uid)
          .get()
          .then(documentSnapshot => {
            setLoading(false);
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              setProfile({
                fullname: userData.fullname,
                moneyRange: userData.moneyRange,
                gender: userData.gender,
                dateofbirth: moment(userData.dateofbirth),
                avatarURL: userData.avatarURL,
              });
              setInputValue(Number(userData.moneyRange));
              filter(new Date(), list, Number(userData.moneyRange));
            } else {
              setProfile({
                fullname: '',
                moneyRange: '0',
                gender: '',
                dateofbirth: '',
                avatarURL: '',
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        profile={profile}
        _monthSelected={profile}
        limitSpendingToday={limitSpendingToday}
        scrollRef={scrollRef}
        months={months}
        setMonthSelected={setMonthSelected}
        filter={filter}
        spendingsOrigin={spendingsOrigin}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Loading_Body />
        ) : (
          <Home_Body
            inputValue={inputValue}
            outputValue={outputValue}
            months={months}
            _monthSelected={_monthSelected}
            spendings={spendings}
            setStateForKey={setStateForKey}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grey,
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default connect(HomeScreen);
