import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';

const SearchSpendingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Tìm kiếm..." />
      {/* <TouchableOpacity style={styles.filterIcon}>
        <Ionicons name="filter-outline" size={24} color="black" />
      </TouchableOpacity> */}
      <Text>kiete</Text>
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
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 18,
    paddingHorizontal: 16,
  },
  filterIcon: {
    marginLeft: 8,
  },
});

export default SearchSpendingPage;
