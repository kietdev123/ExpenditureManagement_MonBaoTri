import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const ItemOnboard = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{data.content}</Text>
      <Image
        style={styles.image}
        elevation={5}
        source={data.image}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  content: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: '#000',
    width: '80%',
    height: '80%',
    backgroundColor: 'gray',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: -10,
      width: -10,
    },
  },
});

export default ItemOnboard;
