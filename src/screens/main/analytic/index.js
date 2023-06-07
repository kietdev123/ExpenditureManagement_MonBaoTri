import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AnalyticScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending</Text>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => {
          navigation.navigate('SearchSpendingPage');
        }}>
        <Icon name="search-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnalyticScreen;
