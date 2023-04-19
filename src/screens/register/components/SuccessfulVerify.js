import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/dist/Entypo';

function SuccessfulVerify({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notifications}>Verify Email</Text>
      <View>
        <Text style={styles.text}>Congratulations!</Text>
        <Text style={styles.text}>Your email has been verifed!</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('../../../assets/icons/verify-email.png')}
      />
      <TouchableOpacity
        style={styles.buttonResend}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <IconEntypo name="home" size={30} color="#fff" />
        <Text style={styles.textResend}>Go to Home</Text>
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
    height: 120,
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

export default SuccessfulVerify;
