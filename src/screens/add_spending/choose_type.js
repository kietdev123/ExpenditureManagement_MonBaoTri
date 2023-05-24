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
import {connect, setStateForKey} from 'react-native-redux';
import Icon from 'react-native-vector-icons/Ionicons.js';
import InputMoney from './components/input_money';
import InputSpending from './components/input_spending';
import ItemSpending from './components/item_spending';
import COLORS from '../../constants/colors';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import LISTS from '../../constants/list';

const data = [
  {label: 'Tất cả', value: 'all'},
  {label: 'Chi tiêu', value: 'spending'},
  {label: 'Thu nhập', value: 'income'},
];

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
const ChooseTypePage = ({navigation}) => {
  const [text, onChangeText] = useState('');

  const [value, setValue] = useState('all');
  const [isFocus, setIsFocus] = useState(false);

  const AppBar = () => {
    return (
      <View>
        <View style={{height: 20, backgroundColor: 'white'}}></View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <View style={{width: 150, backgroundColor: 'white'}}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <TextInput
            // style={styles.input}
            style={styles.searchInputContainer}
            onChangeText={onChangeText}
            value={text}
            placeholder="Tìm kiếm"
          />
        </View>

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
        </View>
      </View>
    );
  };

  const TextComponents = Array.from({length: 30}, (_, index) => (
    <Text key={index}>Text Component {index + 1}</Text>
  ));

  const ListType = () => {
    return (
      <FlatList
        data={listType}
        renderItem={({item, index}) => {
          var searchText = text.toLowerCase();

          if (item.vntitle.toLowerCase().includes(searchText) == false) {
            return <></>;
          }
          if (
            value == 'income' &&
            [29, 30, 34, 36, 37, 40, 27, 35, 38, 41].indexOf(index) == -1
          ) {
            return <></>;
          }
          if (
            value == 'spending' &&
            [29, 30, 34, 36, 37, 40, 35].indexOf(index) != -1
          ) {
            return <></>;
          }
          if (item.image != null) {
            // var imageName = require('../../' + item.image);
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setStateForKey('index_choosen', {id: index});
                    navigation.goBack();
                  }}>
                  <View style={styles.typeItem}>
                    {/* <Text style={styles.item}>{item.image}</Text> */}
                    <View style={styles.container}>
                      <Image source={item.image} style={styles.image} />
                    </View>
                    <View style={styles.typeItem_text}>
                      <Text style={styles.item}>{item.vntitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          } else {
            return (
              <>
                <View style={styles.titleType}>
                  <Text style={styles.itemTitleText}>{item.vntitle}</Text>
                </View>
              </>
            );
          }
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      {AppBar()}
      <ScrollView></ScrollView>
      <View>{ListType()}</View>
      <View style={{height: 200}}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleType: {
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: 15,
  },
  typeItem_text: {
    alignSelf: 'center',
  },
  image_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
  itemTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeItem: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignContent: 'center',
    flexDirection: 'row',
    // marginBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    // height: 40,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  header: {
    height: 30,
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
    width: 100,
    height: 10,
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
  searchInputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 20,
    height: 55,
    backgroundColor: COLORS.grey,
    // backgroundColor: 'yellow',
    marginLeft: 24,
    marginRight: 24,
    marginVertical: 10,
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default connect(ChooseTypePage);
