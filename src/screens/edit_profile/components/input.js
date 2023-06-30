/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../../../constants/colors.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label,
  value,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
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
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          value={value}
          style={{color: COLORS.black, flex: 1, marginLeft: 10}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: 'black', fontSize: 22, marginRight: 15}}
          />
        )}
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
    borderRadius: 10,
    height: 55,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderWidth: 0.5,
    marginVertical: 10,
  },
});

export default Input;
