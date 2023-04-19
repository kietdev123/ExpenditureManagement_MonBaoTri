import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import IconFontisto from 'react-native-vector-icons/dist/Fontisto';

function EmailVerify({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notifications}>Verify Email</Text>
      <Text style={styles.text}>
        Pleases check your email and verify your email!
      </Text>
      <Image
        style={styles.logo}
        source={require('../../../assets/icons/email_icon.png')}
      />
      <TouchableOpacity
        style={styles.buttonResend}
        onPress={() => {
          navigation.navigate('SuccessfulVerify');
        }}>
        <IconFontisto name="email" size={30} color="#fff" />
        <Text style={styles.textResend}>Resend email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SuccessfulVerify');
        }}>
        <Text style={styles.buttonCancel}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    alignItems: 'center',
    gap: 5,
  },
  notifications: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ED4032',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
  },
  buttonResend: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    backgroundColor: '#FC6B68',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  textResend: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonCancel: {
    color: '#6E2DD1',
    marginTop: 20,
  },
});

export default EmailVerify;
