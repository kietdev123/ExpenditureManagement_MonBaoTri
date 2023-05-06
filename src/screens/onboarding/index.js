import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ItemOnboard from './components/ItemOnboard';

const Onboarding = () => {
  const onboardList = [
    {
      image: require('../../assets/intro/home.jpg'),
      title: 'Home',
      content: 'View monthly spending summary and remaining balance',
    },
    {
      image: require('../../assets/intro/calendar.jpg'),
      title: 'Calendar',
      content: 'Review your scheduled expenses',
    },
    {
      image: require('../../assets/intro/add.jpg'),
      title: 'Add spending',
      content: 'Add and edit your daily spending',
    },
    {
      image: require('../../assets/intro/share.jpg'),
      title: 'Share',
      content: 'Share your spending with friends',
    },
    {
      image: require('../../assets/intro/search.jpg'),
      title: 'Search',
      content: 'Search for your expenses',
    },
    {
      image: require('../../assets/intro/analytic.jpg'),
      title: 'Statistical',
      content: 'View your spending and income reports through graphs',
    },
    {
      image: require('../../assets/intro/profile.jpg'),
      title: 'Account',
      content: 'Edit personal information and other settings',
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handleSkip = () => {
    setCurrentPage(onboardList.length - 1);
  };

  const handleNext = () => setCurrentPage(currentPage + 1);

  const handlePaginationPress = index => {
    setCurrentPage(index);
  };

  const handlePageChange = index => {
    setCurrentPage(index);
  };

  const handleStart = () => {};

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        onIndexChanged={handlePageChange}
        index={currentPage}
        showsPagination={false}>
        {onboardList.map((item, index) => (
          <ItemOnboard key={index} data={item} />
        ))}
      </Swiper>
      <SafeAreaView style={styles.bottomSheet}>
        {currentPage === onboardList.length - 1 ? (
          <TouchableOpacity
            style={styles.buttonTextStart}
            onPress={handleStart}>
            <Text style={styles.textStart}>Bắt đầu</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <View style={styles.pagination}>
              {Array.from({length: onboardList.length}, (_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handlePaginationPress(i)}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: currentPage === i ? '#00786B' : '#B9B9B9',
                  }}
                />
              ))}
            </View>
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.buttonText}>Tiếp</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B83F6DC',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonTextStart: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 20,
    backgroundColor: '#fc6b68',
  },
  textStart: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});

export default Onboarding;
