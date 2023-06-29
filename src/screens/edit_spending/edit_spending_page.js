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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import InputMoney from './components/input_money';
import InputSpending from './components/input_spending';
import ItemSpending from './components/item_spending';
import COLORS from '../../constants/colors';
import DatePicker from 'react-native-date-picker';
import {connect, useStateX} from 'react-native-redux';
import SpendingFirebase from '../../controls/spending_firebase';

const EditSpendingPage = ({navigation}) => {
  const type_index = useStateX('spending_selected_type.value');
  const friends = useStateX('spending_selected_friend.value');
  const id = useStateX('spending_selected_id.value');

  const [more, setMore] = useState(false);
  const [money, setMoney] = useState('');

  const [image, setImage] = useState('');

  const [inputs, setInputs] = React.useState({
    money: Math.abs(useStateX('spending_selected_money.value')),
    location: useStateX('spending_selected_location.value'),
    note: useStateX('spending_selected_note.value'),
  });

  const [date, setDate] = useState(
    new Date(useStateX('spending_selected_dateTime.value').toDate()));
  const [open, setOpen] = useState(false);
  const [dobLabel, setdobLabel] = useState(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`);

  const [timeSpending, setTimeSpending] = useState(
    new Date(useStateX('spending_selected_dateTime.value').toDate()));
  const [openTimeSpending, setOpenTimeSpending] = useState(false);
  const [dobLabelTimeSpending, setdobLabelTimeSpending] = useState(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));

  const [errors, setErrors] = React.useState({});

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    try {
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
    } catch (error) {
      console.log(error);
    }
   
    return isValid;
  };
  const handleOnchange = (text, input) => {
    console.log(text + ' : ' + input);
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const addingSpending = async () => {
    // Functionality to save the spending
    let check = validate();
    console.log(check);
    if (type_index == -1) {
      Alert.alert('Vui lòng chọn loại');
      return;
    }
    if (check) {
      var _money = Number(inputs.money);
      if ([29, 30, 34, 36, 37, 40].indexOf(type_index) != -1) {
        _money = _money * 1;
        console.log("he");
      } else {
        _money = _money * -1;
      }
       console.log('id ' + id);
      console.log('type index : ' + type_index);
      console.log('money : ' + _money);
      console.log('Date spending : ' + date.toLocaleDateString('vi'));
      console.log('Time spending : ' + date.toLocaleTimeString('vi'));
      console.log('note : ' + inputs.note);
      console.log('location : ' + inputs.location);
      console.log('friend : ' + friends);
      console.log('image : ' + image);
      console.log(inputs);
      await SpendingFirebase.updateSpending(
        id,
        _money,
        date,
        inputs.note,
        type_index,
        listType[type_index].vntitle,
        inputs.location,
        friends,
        image,
      );
      navigation.navigate('Home');
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
              navigation.navigate('EditChooseTypePage');
            }}>
            {type_index == -1 ? (
              <>
                <Image
                  source={require('../../assets/icons/question_mark.png')}
                  resizeMode="contain"
                  style={{width: 35}}
                />
              </>
            ) : (
              <>
                <Image
                  source={listType[type_index].image}
                  resizeMode="contain"
                  style={{width: 35}}
                />
                <Text>{listType[type_index].vntitle}</Text>
              </>
            )}
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
            defaultValue = {inputs.note}
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
            defaultValue={inputs.location}
            hintText="Địa điểm"></InputSpending>
          <Line></Line>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditAddFriendPage');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 16,
              }}>
              <Icon
                name="people"
                color="orange"
                size={30}
                style={{marginRight: 12}}
              />
              {friends.length == 0 ? (
                <View style={{paddingLeft: 24}}>
                  <Text>Thêm bạn bè</Text>
                </View>
              ) : (
                <>
                  <View>
                    <FlatList
                      horizontal={true}
                      style={{flexDirection: 'row'}}
                      data={friends}
                      renderItem={({item}) => (
                        <Text style={{fontSize: 20, marginRight: 12}}>
                          {item},
                        </Text>
                      )}
                    />
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* <ImageComponent></ImageComponent> */}
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
        <Text style={styles.title}>Chỉnh Sửa Chi Tiêu</Text>
        <TouchableOpacity onPress={addingSpending}>
          <Text style={styles.save}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <InputMoney
          onChangeText={text => handleOnchange(text, 'money')}
          onFocus={() => handleError(null, 'money')}
          defaultValue={Math.abs(inputs.money).toString()}
          placeholder="100.000 VNĐ"
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

export default connect(EditSpendingPage);

const listType = [
  {title: 'monthly_spending', vntitle: 'Chi tiêu hàng tháng'},
  {
    image: require('../../assets/icons/eat.png'),
    title: 'eating',
    vntitle: 'Ăn uống',
  },
  {
    image: require('../../assets/icons/taxi.png'),
    title: 'move',
    vntitle: 'Di chuyển',
  },
  {
    image: require('../../assets/icons/house.png'),
    title: 'rent_house',
    vntitle: 'Thuê nhà',
  },
  {
    image: require('../../assets/icons/water.png'),
    title: 'water_money',
    vntitle: 'Tiền nước',
  },
  {
    image: require('../../assets/icons/phone.png'),
    title: 'telephone_fee',
    vntitle: 'Tiền điện thoại',
  },
  {
    image: require('../../assets/icons/electricity.png'),
    title: 'electricity_bill',
    vntitle: 'Tiền điện',
  },
  {
    image: require('../../assets/icons/gas.png'),
    title: 'gas_money',
    vntitle: 'Tiền ga',
  },
  {
    image: require('../../assets/icons/tv.png'),
    title: 'tv_money',
    vntitle: 'Tiền TV',
  },
  {
    image: require('../../assets/icons/internet.png'),
    title: 'internet_money',
    vntitle: 'Tiền internet',
  },
  {title: 'necessary_spending', vntitle: 'Chi tiêu cần thiết'},
  {
    image: require('../../assets/icons/house_2.png'),
    title: 'repair_and_decorate_the_house',
    vntitle: 'Sửa và trang trí nhà',
  },
  {
    image: require('../../assets/icons/tools.png'),
    title: 'vehicle_maintenance',
    vntitle: 'Bảo dưỡng xe',
  },
  {
    image: require('../../assets/icons/doctor.png'),
    title: 'physical_examination',
    vntitle: 'Khám sức khỏe',
  },
  {
    image: require('../../assets/icons/health-insurance.png'),
    title: 'insurance',
    vntitle: 'Bảo hiểm',
  },
  {
    image: require('../../assets/icons/education.png'),
    title: 'education',
    vntitle: 'Giáo dục',
  },
  {
    image: require('../../assets/icons/armchair.png'),
    title: 'housewares',
    vntitle: 'Đồ gia dụng',
  },
  {
    image: require('../../assets/icons/toothbrush.png'),
    title: 'personal_belongings',
    vntitle: 'Đồ dùng cá nhân',
  },
  {
    image: require('../../assets/icons/pet.png'),
    title: 'pet',
    vntitle: 'Thú cưng',
  },
  {
    image: require('../../assets/icons/family.png'),
    title: 'family_service',
    vntitle: 'Dịch vụ gia đình',
  },
  {
    image: require('../../assets/icons/box.png'),
    title: 'other_costs',
    vntitle: 'Chi phí khác',
  },
  {title: 'fun_play', vntitle: 'Vui - Chơi'},
  {
    image: require('../../assets/icons/sports.png'),
    title: 'sport',
    vntitle: 'Thể thao',
  },
  {
    image: require('../../assets/icons/diamond.png'),
    title: 'beautify',
    vntitle: 'Làm đẹp',
  },
  {
    image: require('../../assets/icons/give-love.png'),
    title: 'gifts_donations',
    vntitle: 'Quà tặng & Quyên góp',
  },
  {
    image: require('../../assets/icons/card-payment.png'),
    title: 'online_services',
    vntitle: 'Dịch vụ trực tuyến',
  },
  {
    image: require('../../assets/icons/game-pad.png'),
    title: 'fun_play',
    vntitle: 'Vui - Chơi',
  },
  {title: 'investments_loans_debts', vntitle: 'Đầu tư, Cho vay & Nợ'},
  {
    image: require('../../assets/icons/stats.png'),
    title: 'invest',
    vntitle: 'Đầu tư',
  },
  {
    image: require('../../assets/icons/coins.png'),
    title: 'debt_collection',
    vntitle: 'Thu nợ',
  },
  {
    image: require('../../assets/icons/loan.png'),
    title: 'borrow',
    vntitle: 'Đi vay',
  },
  {
    image: require('../../assets/icons/borrow.png'),
    title: 'loan',
    vntitle: 'Cho vay',
  },
  {
    image: require('../../assets/icons/pay.png'),
    title: 'pay',
    vntitle: 'Trả nợ',
  },
  {
    image: require('../../assets/icons/commission.png'),
    title: 'pay_interest',
    vntitle: 'Trả lãi',
  },
  {
    image: require('../../assets/icons/percentage.png'),
    title: 'earn_profit',
    vntitle: 'Thu lãi',
  },
  {title: 'revenue', vntitle: 'Khoản thu'},
  {
    image: require('../../assets/icons/money.png'),
    title: 'salary',
    vntitle: 'Lương',
  },
  {
    image: require('../../assets/icons/money-bag.png'),
    title: 'other_income',
    vntitle: 'Thu nhập khác',
  },
  {title: 'other', vntitle: 'Khác'},
  {
    image: require('../../assets/icons/wallet-symbol.png'),
    title: 'money_transferred',
    vntitle: 'Tiền chuyển đi',
  },
  {
    image: require('../../assets/icons/wallet.png'),
    title: 'money_transferred_to',
    vntitle: 'Tiền chuyển đến',
  },
  {
    image: require('../../assets/icons/plus.png'),
    title: 'new_group',
    vntitle: 'Nhóm mới',
  },
];
