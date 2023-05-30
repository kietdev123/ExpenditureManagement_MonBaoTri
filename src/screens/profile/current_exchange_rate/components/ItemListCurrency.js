import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Divider} from '@rneui/themed';

const ItemListCurrency = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Divider orientation="vertical" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ItemListCurrency;
