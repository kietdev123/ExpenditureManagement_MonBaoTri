import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {useTranslation} from 'react-i18next';
import AppStyles from '../../../constants/app_styles.js';

const TextContinue = () => {
  // const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      {/* <Text style={styles.text}>{t('or_continue_with')}</Text> */}
      <Text style={styles.text}>Hoặc tiếp tục với</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  text: {
    ...AppStyles.p,
    marginHorizontal: 10,
  },
});

export default TextContinue;
