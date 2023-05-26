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
import React, {useState, useEffect} from 'react';
import {connect} from 'react-native-redux';

import COLORS from '../../../constants/colors.js';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Input from '../../signup/components/input.js';
import Button from '../../signup/components/button.js';
import EXCHANGE from '../../../constants/exchange.js';

const CurrencyExchangeRatePage = ({navigation}) => {
  const symbols = EXCHANGE.getSymbolCurrency();
  const rate = EXCHANGE.getExchangeRate;
  const countries = EXCHANGE.getCountry();
  //  countrie[0] = {"countryName": "Zambia", "currencyCode": "ZMW", "symbol": ""}

  return (
    <>
      <View>
        <Text>CurrencyExchangeRate</Text>
        <Text>{rate.VND}</Text>
        <Text>{countries[0].countryName}</Text>
        <Text>{symbols[0].currency}</Text>
      </View>
    </>
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
    position: 'absolute',
    right: 0,
    top: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.grey,
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

export default connect(CurrencyExchangeRatePage);
