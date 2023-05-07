import React from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';
import COLORS from '../../../constants/colors.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const InputMoney = ({error, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <TextInput
          keyboardType="number-pad"
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={{color: COLORS.black, flex: 1, marginLeft: 10}}
          {...props}
        />
      </View>
      {error && (
        <Text style={{marginLeft: 10, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 10,
    height: 55,
    backgroundColor: COLORS.grey,
    flexDirection: 'row',
    borderWidth: 0.5,
    marginVertical: 10,
  },
});

export default InputMoney;
