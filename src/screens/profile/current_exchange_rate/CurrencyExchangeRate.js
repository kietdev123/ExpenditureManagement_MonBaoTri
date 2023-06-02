/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Header} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import IconSearch from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import ItemListCurrency from './components/ItemListCurrency';
import APIService from './components/APIService';
import DropDownPicker from 'react-native-dropdown-picker';

const backgroundHeaderColor = '#fff';

const CurrencyExchangeRate = () => {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState({});
  const [listCountry, setListCountry] = useState([]);
  const [selectedValue, setSelectedValue] = useState('VND');
  const [selectedNumberCurrency, setSelectedNumberCurrency] = useState(1);
  const [search, setSearch] = useState('');
  const filteredData = Object.entries(currency).filter(key =>
    key[0].toString().toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    APIService.loadExchangeRate().then(value => {
      setCurrency(value);
      console.log('currency: ', value);
    });
    APIService.loadCountries().then(value => {
      setListCountry(value);
      console.log('listCountry: ', value);
    });
  }, []);

  //ScrollView
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log('selectedValue', selectedValue);
  }, [selectedValue]);
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: '#ccc',
          }}
          backgroundColor={backgroundHeaderColor}
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack
                name="arrow-back-ios"
                size={26}
                color={'#000'}
                style={styles.iconBack}
              />
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={styles.titleHeader}>Tỷ Giá Tiền Tệ</Text>
          }
        />
        <View style={styles.backgroundInputNumber}>
          <CurrencyInput
            value={selectedNumberCurrency}
            style={styles.inputNumber}
            textAlign="right"
            keyboardType="numeric"
            maxLength={15}
            placeholder={'100.000'}
            delimiter=","
            separator="."
            precision={0}
            onChangeValue={value => {
              setSelectedNumberCurrency(value);
            }}
          />

          <DropDownPicker
            items={Object.entries(currency).map(key => ({
              label: key[0],
              value: key[0],
            }))}
            open={open}
            setOpen={() => setOpen(!open)}
            style={styles.inputCurrency}
            value={selectedValue}
            setValue={value => {
              setSelectedValue(value);
            }}
            placeholder="Chọn đơn vị tiền tệ"
            showTickIcon={false}
            containerStyle={{
              width: 100,
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
              elevation: 1,
            }}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.customSearch}>
            <IconSearch name="search" size={18} />
            <TextInput
              style={styles.searchText}
              placeholder="Tìm kiếm theo tên quốc gia hoặc tiền tệ"
              onChangeText={text => setSearch(text)}
            />
          </View>
        </View>
        {/* <View style={styles.listCurrency}>
          {filteredData.map(item => (
            <ItemListCurrency key={item.id} item={item} />
          ))}
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconBack: {
    marginLeft: 10,
  },
  backgroundInputNumber: {
    flexDirection: 'row',
    backgroundColor: backgroundHeaderColor,
    padding: 20,
    gap: 5,
  },
  inputNumber: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#F4EFF3',
    borderRadius: 15,
    padding: 10,
  },
  inputCurrency: {
    flex: 0,
    width: 100,
    alignSelf: 'flex-end',
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: backgroundHeaderColor,
    marginVertical: 10,
    zIndex: 0,
  },
  customSearch: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F4EFF3',
    borderRadius: 15,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
  },
  listCurrency: {
    paddingHorizontal: 20,
    gap: 10,
  },
  scrollViewContainer: {
    zIndex: 0,
  },
});
export default CurrencyExchangeRate;
