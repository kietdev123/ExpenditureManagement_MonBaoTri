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
      title: 'Trang Chủ',
      content: 'Xem tổng kết chi tiêu và số dư còn lại hàng tháng',
    },
    {
      image: require('../../assets/intro/calendar.jpg'),
      title: 'Lịch',
      content: 'Xem lại những chi tiêu theo lịch biểu',
    },
    {
      image: require('../../assets/intro/add.jpg'),
      title: 'Thêm Chi Tiêu',
      content: 'Thêm và chỉnh sửa chi tiêu hàng ngày của bạn',
    },
    {
      image: require('../../assets/intro/share.jpg'),
      title: 'Chia sẻ',
      content: 'Chia sẻ chi tiêu của bạn cho bạn bè',
    },
    {
      image: require('../../assets/intro/search.jpg'),
      title: 'Tìm kiếm',
      content: 'Tìm kiếm các chi tiêu của bạn',
    },
    {
      image: require('../../assets/intro/analytic.jpg'),
      title: 'Thống kê',
      content: 'Xem báo cáo chi tiêu và thu nhập của bạn qua biểu đồ',
    },
    {
      image: require('../../assets/intro/profile.jpg'),
      title: 'Tài khoản',
      content: 'Chỉnh sửa thông tin cá nhân cùng các cài đặt khác',
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const swiperRef = useRef(null);

  const handleSkip = () => {
    swiperRef.current.scrollTo(onboardList.length - 1);
    setCurrentPage(onboardList.length - 1);
  };

  const handleNext = () => {
    swiperRef.current.scrollTo(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const handlePaginationPress = index => {
    swiperRef.current.scrollTo(index);
    setCurrentPage(index);
  };

  const handleStart = () => {};

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        ref={swiperRef}
        onIndexChanged={index => setCurrentPage(index)}
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
              {onboardList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePaginationPress(index)}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor:
                      currentPage === index ? '#00786B' : '#B9B9B9',
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
