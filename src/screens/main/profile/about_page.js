/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconTwitter from 'react-native-vector-icons/Entypo';
import IconEmail from 'react-native-vector-icons/Fontisto';

const AboutPage = () => {
  const handleFacebookPress = async () => {
    const url = 'https://fb.com/ngoctien.TNT';
    await Linking.openURL(url);
  };

  const handleTwitterPress = async () => {
    const url = 'https://twitter.com/ngoctienTNT';
    await Linking.openURL(url);
  };

  const handleTelegramPress = async () => {
    const url = 'https://t.me/ngoctienTNT';
    await Linking.openURL(url);
  };

  const handleEmailPress = async () => {
    const email = 'ngoctienTNT.vn@gmail.com';
    const subject = 'Spending Manager';
    const body = 'Hello Tran Ngoc Tien';

    const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    await Linking.openURL(emailUrl);
  };

  const handleMomoPress = async () => {
    const url = 'https://me.momo.vn/ngoctienTNT';
    await Linking.openURL(url);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: 20,
      }}>
      <View
        style={{
          alignItems: 'center',
          gap: 5,
          paddingBottom: 10,
          borderBottomWidth: 0.2,
        }}>
        <Image
          source={require('../../.../../../assets/logo/logo.png')}
          style={{width: 150, height: 150}}
        />
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          Spending Management
        </Text>
        <Text>Version 1.0.0</Text>
        <Text>Developed by Trần Ngọc Tiến</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'flex-start',
            gap: 10,
            paddingTop: 20,
          }}>
          <TouchableOpacity onPress={handleFacebookPress}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="facebook" size={40} style={{color: '#4267B2'}} />
              <Text style={{fontSize: 16}}>Contact me via Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTwitterPress}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconTwitter
                name="twitter-with-circle"
                size={40}
                style={{color: '#1DA1F2'}}
              />
              <Text style={{fontSize: 16}}>Contact me via Twitter</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTelegramPress}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="telegram" size={40} style={{color: '#0088CC'}} />
              <Text style={{fontSize: 16}}>Contact me via Telegram</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEmailPress}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{padding: 8, borderRadius: 50, backgroundColor: 'red'}}>
                <IconEmail name="email" size={24} color={'white'} />
              </View>
              <Text style={{fontSize: 16}}>Contact me via Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 150,
          bottom: 0,
        }}>
        <TouchableOpacity onPress={handleMomoPress}>
          <Image
            source={require('../../../assets/images/buy-me-a-coffee.png')}
            style={{width: 200, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutPage;
