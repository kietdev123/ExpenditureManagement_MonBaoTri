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
import {connect} from 'react-native-redux';

import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../../signup/components/input.js';
import Button from '../../signup/components/button.js';
import SpendingFirebase from '../../../controls/spending_firebase.js';
import firestore from '@react-native-firebase/firestore';
import {Dimensions} from 'react-native';
let datas = [{key: 0, text: "Hello"}, {key: 1, text: "World"}]


const HomeScreen = ({navigation}) => {
  const flatlistRef = useRef<FlatList<Date>>(null);
  let scrollRef = useRef(null)

  const [inputValue, setInputValue] = useState(1000000);
  const [outputValue, setOutputValue] = useState(0);

  const [loading, setLoading] = useState(true);

  const [spendings, setSpendings] = useState([]);
  const [spendingsOrigin, setSpendingsOrigin] = useState([]);

  const [_monthSelected, setMonthSelected]  = useState(18);
  const [refFlatList, setRefFlatList] = useState();
  const [months, setMonths ] = useState([]);

  const ref = firestore().collection('spendings');

  function filter(month_index) {
    var temp_spendings = [];
    var temp_output_value = inputValue;

    for (var index in spendingsOrigin){
      var item = spendingsOrigin[index];

      var date = new Date(item.dateTime.toDate());

      if (months[month_index].getMonth() == date.getMonth()){
        temp_spendings.push(item);
        temp_output_value += item.money;
      }
    }
    setOutputValue(temp_output_value);
    setSpendings(temp_spendings);
  }

  useEffect(() => {
    var now = new Date();

    next_month = new Date(now.getFullYear(), now.getMonth()+1, 1);
    var temp_months = [now, next_month];
    for (var i = 1 ; i < 19; i ++){
      var current = new Date();
      current.setMonth(now.getMonth() - i);
      temp_months.unshift(current)
    }

    setMonths(temp_months);
    
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
      filter(_monthSelected);
      console.log(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const AppBar = () => {
    return (
      <View>
        {/* <View style={{backgroundColor: COLORS.grey, alignItems: 'center'}}>
      
            <View style={{width: 150, backgroundColor: COLORS.grey}}>
              <Text
                style={{
                  backgroundColor: COLORS.grey,
                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Tháng này
              </Text>
            </View>
        </View>

        <View style={{backgroundColor: COLORS.grey, height: 12}}></View> */}

        <View style={{overflow: 'hidden', paddingBottom: 5}}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: 1,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 3,
              elevation: 5,
            }}
          />
        </View >
  
        <View style={{}}>
        <FlatList
            ref={(it) => (scrollRef.current = it)}
            onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({animated: true})
            }
            horizontal
            data={months}
            // initialScrollIndex={15}
            renderItem={({item, index}) => {
              return <>{index == _monthSelected ? 
                (<>
                <View style={{width: 140 , marginVertical: 8}}>
                  <Text style={{color: 'black', textAlign: 'center', fontSize : 18}}>
                    {index == 18 ? 'Tháng này' : ''}
                    {index == 19 ? 'Tháng sau' : ''}
                    {index == 17 ? 'Tháng trước' : ''}
                    {index < 17 ? `${item.getMonth() + 1 }/${item.getFullYear()}` : ''}
                  </Text>
                  <View style={{height: 1, backgroundColor: 'green', marginTop: 8}}></View>
                </View>
                
                </>) : 
                (<>
                  <TouchableOpacity onPress={
                    () => {
                      setMonthSelected(index); 
                      filter(index);          
                    }
                  }>
                    <View style={{width: 140, marginVertical: 8}}>
                      <Text style={{color: 'blue', textAlign: 'center' , fontSize : 18}}>
                      {index == 18 ? 'Tháng này' : ''}
                      {index == 19 ? 'Tháng sau' : ''}
                      {index == 17 ? 'Tháng trước' : ''}
                      {index < 17 ? `${item.getMonth() + 1 }/${item.getFullYear()}` : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>           
                  
                </>) }</>;
            }}
         />
        </View>
       
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
      </View>
    );
  };

  const Home_Body = () => {
    return (
      <>

        <View style={{backgroundColor: 'white', height: 120, borderRadius: 12, padding: 12}}>
          <View style={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20}}>Số dư đầu</Text>
            <Text style={{fontSize: 20}}>{inputValue} VND</Text>
          </View>
          <View style={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20}}>Số dư cuối</Text>
            <Text style={{fontSize: 20}}>{outputValue} VND</Text>
          </View>
          <View style={{height:1, backgroundColor: 'black', marginTop: 8, marginBottom: 8}}>
          </View>
          <View style={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {(outputValue - inputValue) > 0 ? 'Bạn có thêm ' : ''}
            {(outputValue - inputValue) < 0 ? 'Bạn đã chi ' : ''}
              {Math.abs(outputValue - inputValue)} VND</Text>

          </View>
        </View>


        <View style={{paddingTop: 24, paddingBottom: 24}}>
          <Text style={{
            fontSize: 20, 
            color: '#a09fa1', 
            fontWeight : 'bold', 
            textAlign : 'center'}}>Danh sách chi tiêu {months[_monthSelected].getMonth() + 1 }/{months[_monthSelected].getFullYear()}</Text>
        </View>
        
        {spendings.length == 0 ? 
          (<>
            <View style={{
              height: 300,
              alignItems: 'center',          
              justifyContent: 'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Không có dữ liệu {months[_monthSelected].getMonth() + 1 }/{months[_monthSelected].getFullYear()}!</Text>
          </View>
          </>) 
          : 
          (
          <FlatList
            data={spendings}
            renderItem={({item, index}) => {
              return <>{Item_Spending_Day(item)}</>;
            }}
         />
        )}

      </>
    );
  };

  const Loading_Body = () => {
    return (
      <>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
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

export default connect(HomeScreen);

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
