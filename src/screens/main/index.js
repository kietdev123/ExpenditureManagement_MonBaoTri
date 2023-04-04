import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnalyticScreen from './analytic/index.js';
import CalenderScreen from './calender/index.js';
import HomeScreen from './home/index.js';
import ProfileScreen from './profile/index.js';
//import styles from './styles.js';
import {connect} from 'react-native-redux';

const _renderIcon = (routeName, selectedTab) => {
  let icon = '';
  let label = '';

  switch (routeName) {
    case 'home':
      icon = 'home';
      label = 'Trang chủ';
      break;
    case 'calendar':
      icon = 'calendar';
      label = 'Lịch';
      break;
    case 'analytic':
      icon = 'chart-pie';
      label = 'Phân tích';
      break;
    case 'profile':
      icon = 'user';
      label = 'Tài khoản';
      break;
  }

  return (
    <>
      <Icon
        name={icon}
        color={routeName === selectedTab ? 'black' : 'gray'}
        size={25}
      />
      <Text>{label}</Text>
    </>
  );
};
const renderTabBar = ({routeName, selectedTab, navigate}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  return (
    <>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}>
              <Icon name="plus" size={25} color="#900" />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBarExpo.Screen
          name="home"
          position="LEFT"
          component={HomeScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="calendar"
          position="LEFT"
          component={CalenderScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="analytic"
          component={AnalyticScreen}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          component={ProfileScreen}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </>
  );
};

export default connect(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
