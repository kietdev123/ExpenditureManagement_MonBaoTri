import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect , useRef} from 'react';
import {connect, setStateForKey} from 'react-native-redux';
import { useIsFocused } from "@react-navigation/native";
import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../../signup/components/input.js';
import Button from '../../signup/components/button.js';
import SpendingFirebase from '../../../controls/spending_firebase.js';
import firestore from '@react-native-firebase/firestore';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import { color } from 'react-native-elements/dist/helpers/index.js';

LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: ['Th1.', 'Th2.', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2', 'Th2'],
  dayNames: ['Thứ 2', 'Thứ 2', 'Thứ 2', 'Thứ 2', 'Thứ 2', 'Thứ 2', 'Thứ 2'],
  dayNamesShort: ['T2.', 'T3.', 'T4.', 'T5.', 'T6.', 'T7.', 'CN.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'vn';

const CalenderScreen = ({navigation})  => {

  const [selected, setSelected] = useState('');
  const isFocused = useIsFocused();

  const [inComeValue, setInComeValue] = useState(0);
  const [spendingValue, setSpendingValue] = useState(0);

  const [loading, setLoading] = useState(true);

  const [spendings, setSpendings] = useState([]);
  const [spendingsOrigin, setSpendingsOrigin] = useState([]);

  const [_dateSelected, setDateSelected]  = useState(new Date());

  const ref = firestore().collection('spendings');

  function filter(dateChoice, origin) {
    var temp_spendings = [];
    var temp_income_value = 0;
    var temp_spending_value = 0;

    for (var index in origin){
      var item = origin[index];

      var date = new Date(item.dateTime.toDate());
       console.log(dateChoice);
      if (dateChoice.getDate() == date.getDate() &&
      dateChoice.getMonth() == date.getMonth() &&
      dateChoice.getFullYear() == date.getFullYear() 
      ){
        temp_spendings.push(item);

        if (item.money > 0 ) temp_income_value += item.money;
        else temp_spending_value += item.money;
       }
    }
  
    setInComeValue(temp_income_value);
    setSpendingValue(temp_spending_value);

    setSpendings(temp_spendings);
    setSpendings(temp_spendings);
  }

  useEffect(() => {
    console.log('Home redener');

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
      filter(new Date(), list);
      console.log(list);
      setLoading(false);
    });
  }, [navigation, isFocused]);

  const AppBar = () => {
    return (
      <View style={{height: 220}}>
          <Calendar
          dayComponent={({date, state}) => {
            var count = 0;
            for (var index in spendingsOrigin){
                var spending = spendingsOrigin[index];
                var _date = new Date(spending.dateTime.toDate())
                if (date?.day == _date.getDate() && 
                date?.month == _date.getMonth() + 1 &&
                date?.year == _date.getFullYear()) {
                  count = count + 1;
                }
            }

            if (date?.day == _dateSelected.getDate() && 
              date?.month == _dateSelected.getMonth() + 1 &&
              date?.year == _dateSelected.getFullYear()) {
                return (
                  <TouchableOpacity onPress={() => {
                    setSelected(date.dateString);
                    setDateSelected(new Date(date.dateString))
                    filter(new Date(date.dateString), spendingsOrigin);
                  }}>
                      <View style={{backgroundColor : '#67d79d', borderRadius : 10, padding: 4}}>
                      <Text style={{}}>
                        {date?.day}
                      </Text>
                      { (count > 0) ? <> 
                      <View style={{
                        position: 'absolute', left: 18, top: 14,
                        backgroundColor : 'orange', borderRadius : 10, padding: 2}}>
                          <Text style={{color: 'white', fontSize : 10}}>{count}</Text>
                      </View></> : <></>
                      }
                     
                    </View>
                  </TouchableOpacity>
                 
                );
            }
            if (date?.day ==  new Date().getDate() && 
              date?.month == new Date().getMonth() + 1 &&
              date?.year == new Date().getFullYear()) {
                return (
                  <TouchableOpacity onPress={() => {
                    setSelected(date.dateString);
                    setDateSelected(new Date(date.dateString))
                    filter(new Date(date.dateString), spendingsOrigin);
                  }}>
                      <View style={{backgroundColor : '#aaafaca1', borderRadius : 10, padding: 4}}>
                      <Text style={{color : 'red'}}>
                        {date?.day}
                      </Text>
                      { (count > 0) ? <> 
                      <View style={{
                        position: 'absolute', left: 18, top: 14,
                        backgroundColor : 'orange', borderRadius : 10, padding: 2}}>
                          <Text style={{color: 'white', fontSize : 10}}>{count}</Text>
                      </View></> : <></>
                      }
                    </View>
                  </TouchableOpacity>
                 
                );
            }          
            return (
              <TouchableOpacity onPress={() => {
                setSelected(date.dateString);
                setDateSelected(new Date(date.dateString))
                filter(new Date(date.dateString), spendingsOrigin);
              }}>
                <View>
                  <Text style={{}}>
                    {date?.day}
                  </Text>
                  { (count > 0) ? <> 
                      <View style={{
                        position: 'absolute', left: 18, top: 14,
                        backgroundColor : 'purple', borderRadius : 10, padding: 2}}>
                          <Text style={{color: 'white', fontSize : 10}}>{count}</Text>
                      </View></> : <></>
                      }
                </View>
              </TouchableOpacity>
            );
          }}
          />
       
      </View>
    );
  };

  const Item_Spending_Day = spending => {
    var date = new Date(spending.dateTime.toDate());
    return (
      <View
        style={{
          height: 60,
          width: '100%',

          backgroundColor: 'white',
          borderRadius: 20,
          marginBottom: 20,
        }}>
        <TouchableOpacity
            onPress={() => {       
              setStateForKey('spending_selected_dateTime', {
                value: spending.dateTime
              });
              setStateForKey('spending_selected_friend', {
                value: spending.friend
              });
              setStateForKey('spending_selected_id', {
                value: spending.id
              });
              setStateForKey('spending_selected_image', {
                value: spending.image
              });
              setStateForKey('spending_selected_location', {
                value: spending.location
              });
              setStateForKey('spending_selected_money', {
                value: spending.money
              });
              setStateForKey('spending_selected_note', {
                value: spending.note
              });
              setStateForKey('spending_selected_type', {
                value: spending.type
              });
              setStateForKey('spending_selected_typeName', {
                value: spending.typeName
              });
              navigation.navigate('ViewListSpendingPage');
            }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems : 'center',
              marginLeft: 12,
              marginRight: 12,
              height : 60,
              // backgroundColor : 'yellow'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                height: 30,
              }}>
              <View style={{}}>
                <Image
                  source={listType[spending.type].image}
                  resizeMode="contain"
                  style={{width: 30}}
                />
              </View>
              <View>
                <Text style={{fontWeight: 'bold', marginLeft: 8}}>
                  {spending.typeName}
                </Text>
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                height: 30,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text>{spending.money} VND</Text>
              </View>
              <Icon
                  color="black"
                  name="md-chevron-forward-outline"
                  style={{color: 'black', fontSize: 26, marginLeft: 10}}
                />
            </View>
          
      

          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const Home_Body = () => {
    return (
      <>    
        {spendings.length == 0 ? 
          (<>
            <View style={{
              height: 300,
              alignItems: 'center',          
              justifyContent: 'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color:"orange"}}>
              Bạn không có bất kỳ chi tiêu nào vào ngày {_dateSelected.getDate()}/
              {_dateSelected.getMonth() + 1 }/
              {_dateSelected.getFullYear()}
            </Text>
          </View>
          </>) 
          : 
          (
          <>
          
             <View style={{
              marginTop : 60,
              marginBottom : 12,
              backgroundColor: 'white', height: 70, borderRadius: 12, padding: 12}}>
              <View style={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  justifyContent: 'space-around'}}>
                    <View>
                        <Text style={{fontSize: 15, textAlign : 'center'}}>Thu Nhập</Text>
                         <Text style={{fontSize: 15, 
                          fontWeight : 'bold', color : 'blue'}}>{inComeValue} VND</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, textAlign : 'center'}}>Chi Tiêu</Text>
                         <Text style={{fontSize: 15,
                        fontWeight : 'bold', color : 'red'}}>{spendingValue} VND</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, textAlign : 'center'}}>Tổng</Text>
                         <Text style={{fontSize: 15,
                        fontWeight : 'bold', color : 'green'}}>{inComeValue + spendingValue} VND</Text>
                    </View>
              </View>
          
              
            </View>
            <FlatList
            data={spendings}
            renderItem={({item, index}) => {
              return <>{Item_Spending_Day(item)}</>;
            }}
         />
          </>
         
        )}

      </>
    );
  };

  const Loading_Body = () => {
    return (
      <>
        <View style={{alignItems: 'center', alignSelf: 'center', marginTop: 50}}>
          <ActivityIndicator size="large" color="grey"></ActivityIndicator>
        </View>
      </>
    );
  };


  return (
    <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
      {AppBar()}
      {/* <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}>
          {loading ? Loading_Body() : Home_Body()}
      </ScrollView> */}
      <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        {loading ? Loading_Body() : Home_Body()}
      </View>
    </SafeAreaView>
  );
};

export default connect(CalenderScreen);

const listType = [
  {title: 'monthly_spending', vntitle: 'Chi tiêu hàng tháng'},
  {
    image: require('../../../assets/icons/eat.png'),
    title: 'eating',
    vntitle: 'Ăn uống',
  },
  {
    image: require('../../../assets/icons/taxi.png'),
    title: 'move',
    vntitle: 'Di chuyển',
  },
  {
    image: require('../../../assets/icons/house.png'),
    title: 'rent_house',
    vntitle: 'Thuê nhà',
  },
  {
    image: require('../../../assets/icons/water.png'),
    title: 'water_money',
    vntitle: 'Tiền nước',
  },
  {
    image: require('../../../assets/icons/phone.png'),
    title: 'telephone_fee',
    vntitle: 'Tiền điện thoại',
  },
  {
    image: require('../../../assets/icons/electricity.png'),
    title: 'electricity_bill',
    vntitle: 'Tiền điện',
  },
  {
    image: require('../../../assets/icons/gas.png'),
    title: 'gas_money',
    vntitle: 'Tiền ga',
  },
  {
    image: require('../../../assets/icons/tv.png'),
    title: 'tv_money',
    vntitle: 'Tiền TV',
  },
  {
    image: require('../../../assets/icons/internet.png'),
    title: 'internet_money',
    vntitle: 'Tiền internet',
  },
  {title: 'necessary_spending', vntitle: 'Chi tiêu cần thiết'},
  {
    image: require('../../../assets/icons/house_2.png'),
    title: 'repair_and_decorate_the_house',
    vntitle: 'Sửa và trang trí nhà',
  },
  {
    image: require('../../../assets/icons/tools.png'),
    title: 'vehicle_maintenance',
    vntitle: 'Bảo dưỡng xe',
  },
  {
    image: require('../../../assets/icons/doctor.png'),
    title: 'physical_examination',
    vntitle: 'Khám sức khỏe',
  },
  {
    image: require('../../../assets/icons/health-insurance.png'),
    title: 'insurance',
    vntitle: 'Bảo hiểm',
  },
  {
    image: require('../../../assets/icons/education.png'),
    title: 'education',
    vntitle: 'Giáo dục',
  },
  {
    image: require('../../../assets/icons/armchair.png'),
    title: 'housewares',
    vntitle: 'Đồ gia dụng',
  },
  {
    image: require('../../../assets/icons/toothbrush.png'),
    title: 'personal_belongings',
    vntitle: 'Đồ dùng cá nhân',
  },
  {
    image: require('../../../assets/icons/pet.png'),
    title: 'pet',
    vntitle: 'Thú cưng',
  },
  {
    image: require('../../../assets/icons/family.png'),
    title: 'family_service',
    vntitle: 'Dịch vụ gia đình',
  },
  {
    image: require('../../../assets/icons/box.png'),
    title: 'other_costs',
    vntitle: 'Chi phí khác',
  },
  {title: 'fun_play', vntitle: 'Vui - Chơi'},
  {
    image: require('../../../assets/icons/sports.png'),
    title: 'sport',
    vntitle: 'Thể thao',
  },
  {
    image: require('../../../assets/icons/diamond.png'),
    title: 'beautify',
    vntitle: 'Làm đẹp',
  },
  {
    image: require('../../../assets/icons/give-love.png'),
    title: 'gifts_donations',
    vntitle: 'Quà tặng & Quyên góp',
  },
  {
    image: require('../../../assets/icons/card-payment.png'),
    title: 'online_services',
    vntitle: 'Dịch vụ trực tuyến',
  },
  {
    image: require('../../../assets/icons/game-pad.png'),
    title: 'fun_play',
    vntitle: 'Vui - Chơi',
  },
  {title: 'investments_loans_debts', vntitle: 'Đầu tư, Cho vay & Nợ'},
  {
    image: require('../../../assets/icons/stats.png'),
    title: 'invest',
    vntitle: 'Đầu tư',
  },
  {
    image: require('../../../assets/icons/coins.png'),
    title: 'debt_collection',
    vntitle: 'Thu nợ',
  },
  {
    image: require('../../../assets/icons/loan.png'),
    title: 'borrow',
    vntitle: 'Đi vay',
  },
  {
    image: require('../../../assets/icons/borrow.png'),
    title: 'loan',
    vntitle: 'Cho vay',
  },
  {
    image: require('../../../assets/icons/pay.png'),
    title: 'pay',
    vntitle: 'Trả nợ',
  },
  {
    image: require('../../../assets/icons/commission.png'),
    title: 'pay_interest',
    vntitle: 'Trả lãi',
  },
  {
    image: require('../../../assets/icons/percentage.png'),
    title: 'earn_profit',
    vntitle: 'Thu lãi',
  },
  {title: 'revenue', vntitle: 'Khoản thu'},
  {
    image: require('../../../assets/icons/money.png'),
    title: 'salary',
    vntitle: 'Lương',
  },
  {
    image: require('../../../assets/icons/money-bag.png'),
    title: 'other_income',
    vntitle: 'Thu nhập khác',
  },
  {title: 'other', vntitle: 'Khác'},
  {
    image: require('../../../assets/icons/wallet-symbol.png'),
    title: 'money_transferred',
    vntitle: 'Tiền chuyển đi',
  },
  {
    image: require('../../../assets/icons/wallet.png'),
    title: 'money_transferred_to',
    vntitle: 'Tiền chuyển đến',
  },
  {
    image: require('../../../assets/icons/plus.png'),
    title: 'new_group',
    vntitle: 'Nhóm mới',
  },
];
