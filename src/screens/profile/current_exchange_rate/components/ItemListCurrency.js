import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Divider} from '@rneui/themed';

const ItemListCurrency = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.containerSymbol}>
          <View style={styles.symbol}>
            <Text>BAB</Text>
            <Text>BAB</Text>
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

          {/* <View style={{marginLeft: 10}}>
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
          </View> */}
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            backgroundColor: 'grey',
            padding: 8,
            borderRadius: 10,
          }}>
          N/A
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    padding: '5px',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {marginLeft: 10, alignItems: 'center'},
});

export default ItemListCurrency;
