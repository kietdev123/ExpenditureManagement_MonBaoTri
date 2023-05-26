import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-native-redux';
import COLORS from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons.js';

const ProfileScreen = ({navigation}) => {
  const SettingItem = ({
    icon_name,
    icon_background_color,
    text,
    name_back_screen,
  }) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate(name_back_screen)}>
          <View style={styles.setting_item}>
            <View style={styles.setting_item_group}>
              <View
                style={{
                  ...styles.thumbnail,
                  backgroundColor: icon_background_color,
                }}>
                <Icon name={icon_name} style={styles.setting_item_icon} />
              </View>

              <View style={styles.setting_item_title}>
                <Text style={styles.setting_item_text}>{text}</Text>
              </View>
            </View>

            <Icon
              color="black"
              name="md-chevron-forward-outline"
              style={{color: 'black', fontSize: 35, marginRight: 10}}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Text style={styles.info_component_money}>Profile Screen</Text>
      </View>
      <View style={styles.info_component}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
          style={styles.info_component_image}
        />
        <Text>Tiền hàng tháng</Text>
        <Text style={styles.info_component_money}>1,000,000 VND</Text>
      </View>

      <View style={{height: 300}}>
        <ScrollView>
          {SettingItem({
            icon_name: 'ios-person-sharp',
            icon_background_color: 'rgba(0, 150, 255, 1.0)',
            text: 'Tài Khoản',
            name_back_screen: 'EditProfilePage',
          })}
          {SettingItem({
            icon_name: 'lock-closed',
            icon_background_color: 'rgba(233, 116, 81, 1.0)',
            text: 'Đổi Mật Khẩu',
            name_back_screen: 'ChangePassWordScreen',
          })}
          {SettingItem({
            icon_name: 'moon-sharp',
            icon_background_color: 'black',
            text: 'Chế Độ Tối',
            name_back_screen: 'EditProfilePage',
          })}
          {SettingItem({
            icon_name: 'language',
            icon_background_color: 'rgba(218, 165, 32, 1.0)',
            text: 'Ngôn Ngữ',
            name_back_screen: 'EditProfilePage',
          })}
          {SettingItem({
            icon_name: 'timer-outline',
            icon_background_color: 'rgba(121, 189, 161, 1.0)',
            text: 'Lịch Sử',
            name_back_screen: 'HistoryPage',
          })}
          {SettingItem({
            icon_name: 'ios-archive',
            icon_background_color: 'rgba(137, 207, 240, 1.0)',
            text: 'Xuất CSV',
            name_back_screen: 'EditProfilePage',
          })}
          {SettingItem({
            icon_name: 'ios-logo-usd',
            icon_background_color: 'rgba(255, 192, 0, 1.0)',
            text: 'Tỷ Giá Tiền Tệ',
            name_back_screen: 'CurrencyExchangeRatePage',
          })}
          {SettingItem({
            icon_name: 'information-circle',
            icon_background_color: 'rgba(79, 121, 66, 1.0)',
            text: 'Thông Tin',
            name_back_screen: 'EditProfilePage',
          })}

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
            style={{
              flex: 1,
              height: 55,
              // width: '100%',
              backgroundColor: COLORS.pink,
              borderRadius: 10,

              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 24,
              marginRight: 24,
              marginBottom: 24,
            }}>
            <Text
              style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.grey,
    // Add bottom shadow for Android
    elevation: Platform.OS === 'android' ? 5 : 0,
    // Add bottom shadow for iOS
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  info_component: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  info_component_image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  info_component_money: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  setting_item: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    height: 40,
  },
  thumbnail: {
    backgroundColor: 'yellow',
    height: 44, //any of height
    width: 44, //any of width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22, // it will be height/2
    marginRight: 10,
  },
  setting_item_icon: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'white',
  },
  setting_item_title: {
    // height: 44,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
  },
  setting_item_text: {
    fontSize: 18,
  },
  setting_item_group: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
  },
});

export default connect(ProfileScreen);
