import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-native-redux';

import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import EXCHANGE from '../../../constants/exchange.js';

const data = [
  {label: 'Tất cả', value: 'all'},
  {label: 'Chi tiêu', value: 'spending'},
  {label: 'Thu nhập', value: 'income'},
];

const CurrencyExchangeRatePage = ({navigation}) => {
  const symbols = EXCHANGE.getSymbolCurrency();

  const [rate, setRate] = useState([]);
  const countries = EXCHANGE.getCountry();

  const [money, setMoney] = useState(1);
  const [currentCurrency, setCurrentCurrency] = useState('VND');
  const [searchText, setSearchText] = useState('');

  const [value, setValue] = useState('all');
  const [isFocus, setIsFocus] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    var list = [];
    Object.keys(EXCHANGE.getExchangeRate).map((key, i) => {
      list.push({label: key, value: key});
    });
    setRate(list);
    console.log('init');
  }, []);

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  function symbolsToText(value) {
    var list = value.split(';');
    var res = '';
    for (var i = 0; i < list.length; i++)
      if (list[i] != '') {
        res =
          res + String.fromCharCode(Number(list[i].slice(2, list[i].length)));
      }
    return res;
  }

  const AppBar = () => {
    return (
      <View>
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
          <View style={{position: 'absolute', left: 24, top: 8}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{width: 150, backgroundColor: 'white'}}>
            <Text
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Tỷ Giá Tiền Tệ
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 50,
              marginLeft: 24,
              marginRight: 24,
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <TextInput
              style={{
                backgroundColor: COLORS.grey,
                borderRadius: 10,
                width: '60%',
                marginLeft: 24,
                textAlign: 'right',
              }}
              keyboardType="number-pad"
              placeholder="1"
              onSubmitEditing={event => {
                if (isNumeric(event.nativeEvent.text) == true) {
                  setIsError(false);
                  setMoney(event.nativeEvent.text);
                } else {
                  if (event.nativeEvent.text == '') {
                    setMoney('1');
                  } else {
                    setIsError(true);
                    setErrorMessage('Số tiền nhập không hợp lệ');
                  }
                }
              }}
              underlineColorAndroid="transparent"
            />
            <View
              style={{
                width: 80,
                marginLeft: 10,
                height: 50,
              }}>
              <View>
                <View style={{position: 'absolute', top: 15, left: 0}}>
                  <Text>{currentCurrency}</Text>
                </View>
                <Picker
                  selectedValue={currentCurrency}
                  onValueChange={setCurrentCurrency}>
                  {rate.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {isError == true && (
          <View style={{backgroundColor: 'white'}}>
            <Text style={{color: 'red', marginLeft: 24}}>{errorMessage}</Text>
          </View>
        )}

        <View style={{backgroundColor: 'white', height: 12}}></View>

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

  const SearchBar = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          marginTop: 8,
          paddingBottom: 8,
          paddingTop: 8,
        }}>
        <View style={styles.searchSection}>
          <Icon
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.input_search}
            placeholder="Tìm kiếm theo tên quốc gia hoặc tiền tệ"
            onSubmitEditing={event => {
              setSearchText(event.nativeEvent.text);
            }}
          />
        </View>
      </View>
    );
  };

  const Item_Currency = country => {
    //  countrie[0] = {"countryName": "Zambia", "currencyCode": "ZMW", "symbol": ""}
    var _rate = EXCHANGE.getExchangeRate[country.currencyCode];

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
            marginLeft: 4,
            marginRight: 4,
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 10, alignItems: 'center'}}>
              {country.symbol != '' && (
                <Text style={{fontWeight: 'bold'}}>
                  {symbolsToText(country.symbol)}
                  {/* {country.symbol} */}
                </Text>
              )}

              <Text>{country.currencyCode}</Text>
            </View>

            <View
              style={{
                height: '100%',
                backgroundColor: 'grey',
                marginLeft: 8,
                // marginRight: 8,
                width: 1,
                alignSelf: 'center',
              }}></View>

            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                {(
                  (_rate / EXCHANGE.getExchangeRate[currentCurrency]) *
                  Number(money)
                ).toFixed(11)}
              </Text>
              <Text>
                1 {currentCurrency} ≈{' '}
                {(_rate / EXCHANGE.getExchangeRate[currentCurrency]).toFixed(7)}{' '}
                {country.currencyCode}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontWeight: 'bold',
              alignSelf: 'center',
              backgroundColor: COLORS.grey,
              padding: 8,
              borderRadius: 10,
            }}>
            N/A
          </Text>
        </View>
      </View>
    );
  };

  const ListCurrency = () => {
    return (
      <View style={{paddingTop: 20, paddingHorizontal: 20}}>
        {rate.map((item, index) => {
          var _searchText = searchText.toLowerCase();

          var country = countries.filter(function (element) {
            return element.currencyCode == item.value;
          });
          if (country.length == 0) return <></>;
          if (country[0].countryName == undefined) return <></>;
          if (
            country[0].countryName.toLowerCase().includes(_searchText) ==
              false &&
            country[0].currencyCode.toLowerCase().includes(_searchText) ==
              false &&
            _searchText != ''
          ) {
            return <></>;
          }

          return (
            <View key={index}>
              {country[0].countryName != undefined && Item_Currency(country[0])}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: COLORS.grey, flex: 1}}>
        {AppBar()}
        <ScrollView contentContainerStyle={{}}>
          <View>
            {SearchBar()}
            {ListCurrency()}
          </View>
        </ScrollView>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}></View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.grey,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input_search: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: COLORS.grey,
    borderColor: 10,
    marginRight: 12,
    color: '#424242',
  },
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
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  header: {
    height: 30,
    position: 'absolute',
    right: 0,
    top: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.grey,
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
  },
  searchInputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 20,
    height: 55,
    backgroundColor: COLORS.grey,
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
  dropdown: {
    height: 30,
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

export default connect(CurrencyExchangeRatePage);
