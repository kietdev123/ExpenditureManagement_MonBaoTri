import React, {useState} from 'react';
import {Header} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import CurrencyInput from 'react-native-currency-input';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import IconSearch from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import ItemListCurrency from './components/ItemListCurrency';

const backgroundHeaderColor = '#fff';

const CurrencyExchangeRate = () => {
  const navigation = useNavigation();
  const [selectedCurrency, setSelectedCurrency] = useState('VND');
  const [selectedNumberCurrency, setSelectedNumberCurrency] = useState(1);
  const listCurrency = ['VND', 'UZS', 'VES', 'VUV', 'WST'];

  //ScrollView
  const data = [
    {id: 1, name: 'Apple', rate: 0.0273643},
    {id: 2, name: 'Banana', rate: 0.002347},
    {id: 3, name: 'Cherry', rate: 0.0003842},
    {id: 4, name: 'Durian', rate: 0.0028363},
    {id: 5, name: 'Eggplant', rate: 0.026364},
    {id: 6, name: 'Fig', rate: 0.0836423},
    {id: 7, name: 'Grape', rate: 0.06238748},
    {id: 8, name: 'Honeydew', rate: 0.12324},
    {id: 9, name: 'Iced Tea', rate: 0.2343643},
    {id: 10, name: 'Jackfruit', rate: 0.443643},
  ];
  const [search, setSearch] = useState('');
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View>
      <View>
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
            defaultValue="1"
            placeholder={'100.000'}
            delimiter=","
            separator="."
            precision={0}
            onChangeValue={value => {
              setSelectedNumberCurrency(value);
            }}
          />
          <SelectPicker
            style={styles.inputCurrency}
            mode="dropdown"
            itemStyle={{fontSize: 16}}
            selectedValue={selectedCurrency}
            onValueChange={(value, index) => setSelectedCurrency(value)}>
            {listCurrency.map((item, index) => {
              return (
                <SelectPicker.Item key={index} label={item} value={item} />
              );
            })}
          </SelectPicker>
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
        <View style={styles.listCurrency}>
          {filteredData.map(item => (
            <ItemListCurrency key={item.id} item={item} />
          ))}
        </View>
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
    backgroundColor: backgroundHeaderColor,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
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
    height: 40,
    width: 120,
    padding: 0,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: backgroundHeaderColor,
    marginVertical: 10,
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
});

export default CurrencyExchangeRate;
