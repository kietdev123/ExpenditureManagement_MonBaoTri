import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemSpending = ({icon, text, action, color}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View style={styles.iconContainer}>
        <Icon
          color={color ?? 'grey'}
          name={icon}
          style={{fontSize: 35, marginRight: 10}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.arrowContainer}>
          <Icon
            color="black"
            name="md-chevron-forward-outline"
            style={{color: 'black', fontSize: 35, marginRight: 10}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingTop: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: '#ddd',
    marginLeft: 10,
    // paddingBottom: 10,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default ItemSpending;
