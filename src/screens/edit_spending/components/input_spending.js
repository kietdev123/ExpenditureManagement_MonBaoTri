import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputSpending = ({
  icon,
  color,
  hintText,
  action,
  textInputAction,
  keyboardType,
  textCapitalization = 'none',
}) => {
  const [value, setValue] = useState('');

  const handleInput = text => {
    setValue(text);
    if (action) {
      action(text);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name={icon} color={color} size={30} />
      <TextInput
        style={styles.input}
        placeholder={hintText}
        value={value}
        onChangeText={handleInput}
        textInputAction={textInputAction}
        keyboardType={keyboardType}
        textCapitalization={textCapitalization}
        onSubmitEditing={() => action(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '120%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingBottom: 12,
    paddingTop: 12,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 10,
  },
  input: {
    flex: 1,
    marginStart: 10,
    fontSize: 16,
    paddingLeft: 14,
  },
});

export default InputSpending;
