import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import React, {useState, useEffect, useRef} from 'react';
import {connect, setStateForKey} from 'react-native-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from 'date-fns';
import {PieChart} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';

// Import libraries for Tab View and Charts (e.g., react-native-tab-view, react-native-svg, react-native-chart-kit)

const App = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const ref = firestore().collection('spendings');

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const [inputValue, setInputValue] = useState(1000000);
  const [outputValue, setOutputValue] = useState(0);

  const [selectedDayTo, setSelectedDayTo] = useState(new Date());
  const [selectedDayFrom, setSelectedDayFrom] = useState(
    subWeeks(new Date(), 1),
  );
  const [selectedMonthTo, setSelectedMonthTo] = useState(new Date());
  const [selectedMonthFrom, setSelectedMonthFrom] = useState(
    subMonths(new Date(), 1),
  );
  const [selectedYearTo, setSelectedYearTo] = useState(new Date());
  const [selectedYearFrom, setSelectedYearFrom] = useState(
    subYears(new Date(), 1),
  );

  const [spendings, setSpendings] = useState([]);
  const [spendingsNotUnque, setSpendingsNotUnque] = useState([]);
  const [spendingsOrigin, setSpendingsOrigin] = useState([]);

  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);

  // Sample data for expenses and income
  const formatDate = date => {
    return format(date, 'yyyy-MM-dd');
  };

  const formatMonth = date => {
    return format(date, 'MM/yyyy');
  };
  const formatYear = date => {
    return format(date, 'yyyy');
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  function filterByDate(startDate, endDate, origin, typeChart) {
    var temp_spendings = [];
    var income = 0;
    var spending = 0;

    for (var index in origin) {
      var item = origin[index];
      var date = new Date(item.dateTime.toDate());
      var itemDate = new Date(formatDate(date));
      var startDateNew = new Date(formatDate(startDate));
      var endDateNew = new Date(formatDate(endDate));

      if (itemDate >= startDateNew && itemDate <= endDateNew) {
        if (typeChart == 'spending' && item.money < 0) {
          temp_spendings.push(item);       
        }
        if (typeChart == 'income' && item.money > 0) {
          temp_spendings.push(item);
          income += item.money;
        }
        if (item.money < 0) {
          spending += item.money;
        }
        if (item.money > 0) {
          income += item.money;
        }
      }
    }

    console.log(temp_spendings);

    setSpendingsNotUnque(temp_spendings);
    
    var uniqueSpendings = [];
    for (var index in temp_spendings) {
      var sum = 0;
      var check = true;
      var item = temp_spendings[index];
      for (var index2 in uniqueSpendings) {
        if (item.typeName == uniqueSpendings[index2].name) {
          check = false;
        }
      }
      if (check == true) {
        for (var index2 in temp_spendings) {
          if (temp_spendings[index2].typeName == item.typeName) {
            sum += temp_spendings[index2].money;
          }
        }
        uniqueSpendings.push({
          name: item.typeName,
          amount: sum,
          color: getRandomColor(),
          legendFontColor: '#FFFFFF',
          legendFontSize: 13,
        });
      }
    }
    setIncome(income);
    setSpending(spending);

    setSpendings(uniqueSpendings);
    console.log(uniqueSpendings);
    // setSpendings(temp_spendings);
  }
  useEffect(() => {
    setLoading(true);

    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {money, dateTime, note, type, typeName, location, friend, image} =
          doc.data();
        list.push({
          id: doc.id,
          money,
          dateTime,
          note,
          type,
          typeName,
          location,
          friend,
          image,
        });
      });

      setSpendingsOrigin(list);

      filterByDate(selectedDayFrom, selectedDayTo, list, 'spending');

      // console.log(list);
      setLoading(false);
    });
  }, [navigation, isFocused]);

  // Handle previous date button press
  const handlePrevDate = () => {
    if (selectedTab == 0) {
      setSelectedDayTo(
        subWeeks(selectedDayTo.setDate(selectedDayTo.getDate() - 1), 1),
      );
      setSelectedDayFrom(
        subWeeks(selectedDayFrom.setDate(selectedDayFrom.getDate() - 1), 1),
      );
      if (selectedSubTab == 0) {
        filterByDate(
          subWeeks(selectedDayFrom, 1),
          subWeeks(selectedDayTo, 1),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          subWeeks(selectedDayFrom, 1),
          subWeeks(selectedDayTo, 1),
          spendingsOrigin,
          'income',
        );
      }
    } else if (selectedTab === 1) {
      const year = selectedMonthTo.getFullYear();
      const month = selectedMonthTo.getMonth();
      setSelectedMonthTo(new Date(year, month, 0));
      setSelectedMonthFrom(
        subMonths(selectedMonthFrom.setMonth(selectedMonthFrom.getMonth()), 1),
      );
      if (selectedSubTab == 0) {
        filterByDate(
          subMonths(selectedMonthFrom, 1),
          new Date(year, month, 0),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          subMonths(selectedMonthFrom, 1),
          new Date(year, month, 0),
          spendingsOrigin,
          'income',
        );
      }
    } else if (selectedTab === 2) {
      const year = selectedYearTo.getFullYear();
      const previousYear = year - 1;
      setSelectedYearFrom(new Date(previousYear, 0, 1));
      setSelectedYearTo(new Date(previousYear, 11, 31));
      if (selectedSubTab == 0) {
        filterByDate(
          subYears(selectedYearFrom, 1),
          subYears(selectedYearTo, 1),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          subYears(selectedYearFrom, 1),
          subYears(selectedYearTo, 1),
          spendingsOrigin,
          'income',
        );
      }
    }
  };

  // Handle next date button press
  const handleNextDate = () => {
    if (selectedTab == 0) {
      setSelectedDayTo(
        addWeeks(selectedDayTo.setDate(selectedDayTo.getDate() + 1), 1),
      );
      setSelectedDayFrom(
        addWeeks(selectedDayFrom.setDate(selectedDayFrom.getDate() + 1), 1),
      );
      if (selectedSubTab == 0) {
        filterByDate(
          addWeeks(selectedDayFrom, 1),
          addWeeks(selectedDayTo, 1),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          addWeeks(selectedDayFrom, 1),
          addWeeks(selectedDayTo, 1),
          spendingsOrigin,
          'income',
        );
      }
    } else if (selectedTab == 1) {
      const year = selectedMonthTo.getFullYear();
      const month = selectedMonthTo.getMonth();
      setSelectedMonthTo(new Date(year, month + 2, 0));
      setSelectedMonthFrom(
        addMonths(selectedMonthFrom.setMonth(selectedMonthFrom.getMonth()), 1),
      );
      if (selectedSubTab == 0) {
        filterByDate(
          addMonths(selectedMonthFrom, 1),
          new Date(year, month + 2, 0),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          addMonths(selectedMonthFrom, 1),
          new Date(year, month + 2, 0),
          spendingsOrigin,
          'income',
        );
      }
    } else if (selectedTab == 2) {
      const year = selectedYearTo.getFullYear();
      const nextYear = year + 1;
      setSelectedYearFrom(new Date(nextYear, 0, 1));
      setSelectedYearTo(new Date(nextYear, 11, 31));
      if (selectedSubTab == 0) {
        filterByDate(
          addYears(selectedYearFrom, 1),
          addYears(selectedYearTo, 1),
          spendingsOrigin,
          'spending',
        );
      } else {
        filterByDate(
          addYears(selectedYearFrom, 1),
          addYears(selectedYearTo, 1),
          spendingsOrigin,
          'income',
        );
      }
    }
  };

  // Render chart based on selected tab (Chi tieu, Thu Nhap)
  const renderChart = () => {
    // Use chart library to create a pie chart with colors and icons representing categories
    return (
      <PieChart
        data={spendings}
        width={400}
        height={250}
        accessor="amount"
        backgroundColor="transparent"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `white`, // Thay đổi thành màu xanh dương
          labelColor: (opacity = 1) => `white`,
        }}
        style={{borderRadius: 16}}
      />
    );
  };

  const Item_Spending_Day = spending => {
    var date = new Date(spending.dateTime.toDate());
    return (
      <View
        style={{
          height: 120,
          width: '100%',

          backgroundColor: 'white',
          borderRadius: 20,
          marginBottom: 20,
        }}>
        <TouchableOpacity
            onPress={() => {       
              setStateForKey('spending_selected_dateTime', {
                value: spending.dateTime
              });
              setStateForKey('spending_selected_friend', {
                value: spending.friend
              });
              setStateForKey('spending_selected_id', {
                value: spending.id
              });
              setStateForKey('spending_selected_image', {
                value: spending.image
              });
              setStateForKey('spending_selected_location', {
                value: spending.location
              });
              setStateForKey('spending_selected_money', {
                value: spending.money
              });
              setStateForKey('spending_selected_note', {
                value: spending.note
              });
              setStateForKey('spending_selected_type', {
                value: spending.type
              });
              setStateForKey('spending_selected_typeName', {
                value: spending.typeName
              });
              navigation.navigate('ViewListSpendingPage');
            }}
        >
               <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 12,
                marginRight: 12,
                marginTop: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{alignSelf: 'center', fontSize: 30}}>
                  {date.getDate()}
                </Text>
                <View style={{marginLeft: 10}}>
                  <Text>Thứ {date.getDay()}</Text>
                  <Text>
                    tháng {date.getMonth() + 1} năm {date.getFullYear()}{' '}
                  </Text>
                </View>
              </View>

              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                {spending.money} VNĐ
              </Text>
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: 'grey',
                marginTop: 8,
                marginBottom: 8,
                height: 1,
                alignSelf: 'center',
              }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems : 'center',
                  marginLeft: 12,
                  marginRight: 12,
                  height : 60,
                  // backgroundColor : 'yellow'
                }}>
           
        
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                height: 30,
              }}>
              <View style={{}}>
                <Image
                  source={listType[spending.type].image}
                  resizeMode="contain"
                  style={{width: 30}}
                />
              </View>
              <View>
                <Text style={{fontWeight: 'bold', marginLeft: 8}}>
                  {spending.typeName}
                </Text>
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                height: 30,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text>{spending.money} VND</Text>
              </View>
              {/* <Icon
                  color="black"
                  name="md-chevron-forward-outline"
                  style={{color: 'black', fontSize: 26, marginLeft: 10}}
                /> */}
            </View>
          
      

          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      {/* Tab View */}
      {/* Render the selected tab view (week, month, year) */}
      {/* Add tab indicators for week, month, year */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 25,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
            setSelectedSubTab(0);
            filterByDate(
              selectedDayFrom,
              selectedDayTo,
              spendingsOrigin,
              'spending',
            );
          }}
          style={{
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 0 ? 'white' : 'transparent',
          }}>
          <Text
            style={{
              color: selectedTab === 0 ? 'black' : 'rgba(45, 216, 198, 255)',
            }}>
            Tuần
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
            setSelectedSubTab(0);
            const year = selectedMonthTo.getFullYear();
            const month = selectedMonthTo.getMonth();
            setSelectedMonthFrom(new Date(year, month, 1));
            setSelectedMonthTo(new Date(year, month + 1, 0));
            filterByDate(
              selectedMonthFrom,
              selectedMonthTo,
              spendingsOrigin,
              'spending',
            );
          }}
          style={{
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 1 ? 'white' : 'transparent',
          }}>
          <Text
            style={{
              color: selectedTab === 1 ? 'black' : 'rgba(45, 216, 198, 255)',
            }}>
            Tháng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
            const year = selectedYearTo.getFullYear();
            setSelectedYearFrom(new Date(year, 0, 1));
            setSelectedYearTo(new Date(year, 11, 31));
            filterByDate(
              selectedYearFrom,
              selectedYearTo,
              spendingsOrigin,
              'spending',
            );
          }}
          style={{
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 2 ? 'white' : 'transparent',
          }}>
          <Text
            style={{
              color: selectedTab === 2 ? 'black' : 'rgba(45, 216, 198, 255)',
            }}>
            Năm
          </Text>
        </TouchableOpacity>
      </View>
      {/* Add sub tabs for Chi tieu and Thu Nhap */}
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(44, 66, 96,255)',
            paddingTop: 20,
            height: 450,
            borderWidth: 1,
            borderColor: '#00000026',
            borderRadius: 5,
          }}>
          {selectedTab == 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={handlePrevDate}>
                <Icon
                  name="arrow-back"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 10, color: 'white'}}>
                {formatDate(selectedDayFrom)} - {formatDate(selectedDayTo)}
              </Text>
              <TouchableOpacity onPress={handleNextDate}>
                <Icon
                  name="arrow-forward"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
            </View>
          ) : selectedTab == 1 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={handlePrevDate}>
                <Icon
                  name="arrow-back"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 10, color: 'white'}}>
                {formatDate(selectedMonthFrom)} - {formatDate(selectedMonthTo)}
              </Text>
              <TouchableOpacity onPress={handleNextDate}>
                <Icon
                  name="arrow-forward"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={handlePrevDate}>
                <Icon
                  name="arrow-back"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 10, color: 'white'}}>
                {formatDate(selectedYearFrom)} - {formatDate(selectedYearTo)}
              </Text>
              <TouchableOpacity onPress={handleNextDate}>
                <Icon
                  name="arrow-forward"
                  size={20}
                  color="rgba(45, 216, 198, 255)"
                />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                setSelectedSubTab(0);
                if (selectedTab == 0) {
                  filterByDate(
                    selectedDayFrom,
                    selectedDayTo,
                    spendingsOrigin,
                    'spending',
                  );
                } else if (selectedTab == 1) {
                  const year = selectedMonthTo.getFullYear();
                  const month = selectedMonthTo.getMonth();
                  setSelectedMonthFrom(new Date(year, month, 1));
                  setSelectedMonthTo(new Date(year, month + 1, 0));
                  filterByDate(
                    selectedMonthFrom,
                    selectedMonthTo,
                    spendingsOrigin,
                    'spending',
                  );
                } else {
                  const year = selectedYearTo.getFullYear();
                  setSelectedYearFrom(new Date(year, 0, 1));
                  setSelectedYearTo(new Date(year, 11, 31));
                  filterByDate(
                    selectedYearFrom,
                    selectedYearTo,
                    spendingsOrigin,
                    'spending',
                  );
                }
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color:
                    selectedSubTab === 0 ? 'white' : 'rgba(45, 216, 198, 255)',
                }}>
                Chi tiêu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedSubTab(1);
                if (selectedTab == 0) {
                  filterByDate(
                    selectedDayFrom,
                    selectedDayTo,
                    spendingsOrigin,
                    'income',
                  );
                } else if (selectedTab === 1) {
                  const year = selectedMonthTo.getFullYear();
                  const month = selectedMonthTo.getMonth();
                  setSelectedMonthFrom(new Date(year, month, 1));
                  setSelectedMonthTo(new Date(year, month + 1, 0));
                  filterByDate(
                    selectedMonthFrom,
                    selectedMonthTo,
                    spendingsOrigin,
                    'income',
                  );
                } else {
                  const year = selectedYearTo.getFullYear();
                  setSelectedYearFrom(new Date(year, 0, 1));
                  setSelectedYearTo(new Date(year, 11, 31));
                  filterByDate(
                    selectedYearFrom,
                    selectedYearTo,
                    spendingsOrigin,
                    'income',
                  );
                }
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text
                style={{
                  color:
                    selectedSubTab === 1 ? 'white' : 'rgba(45, 216, 198, 255)',
                }}>
                Thu Nhập
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>
          {(spendings.length == 0 ? 
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'bold',
              color : 'yellow',
              marginTop : 12,
              marginBottom : 12}}>
              Không có dữ liệu</Text> : <></>)}
            {/* Render content based on selectedTab */}
            {selectedTab === 0 && (
              <View>
                {/* Logic to render weekly expenses or income */}
                {selectedSubTab === 0 ? (
                  <View>{renderChart()}</View>
                ) : (
                  <View>{renderChart()}</View>
                )}
              </View>
            )}
            {selectedTab === 1 && (
              <View>
                {/* Logic to render monthly expenses or income */}
                {selectedSubTab === 0 ? (
                  <View>{renderChart()}</View>
                ) : (
                  <View>{renderChart()}</View>
                )}
              </View>
            )}
            {selectedTab === 2 && (
              <View>
                {/* Logic to render yearly expenses or income */}
                {selectedSubTab === 0 ? (
                  <View>{renderChart()}</View>
                ) : (
                  <View>{renderChart()}</View>
                )}
              </View>
            )}
          </ScrollView>
      
            </View>
      </View>
      {/* Render the selected tab content */}

      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Chi Tiêu: </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 5,
                paddingVertical: 10,
                color: 'red',
              }}>
              {spending}
            </Text>
          </View>
          <View style={{width: 20}}></View>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Thu Nhập: </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 5,
                paddingVertical: 10,
                color: 'blue',
              }}>
              {income}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderWidth: 1,
              borderColor: '#00000026',
              borderRadius: 5,
            }}>
            <Text style={styles.title}>Thu chi: </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 5,
                paddingVertical: 10,
                color: 'black',
              }}>
              {income + spending}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={{height:24}}></View>
      
      <View style={{paddingHorizontal: 24}}>
        <FlatList
              data={spendingsNotUnque}
              renderItem={({item, index}) => {
                return <>{Item_Spending_Day(item)}</>;
              }}
          />
      </View>
     

      <View style={{height:100}}></View>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    paddingTop: 15,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00000026',
    borderRadius: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: 'black',
  },
  value: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
export default connect(App);

const listType = [
  {title: 'monthly_spending', vntitle: 'Chi tiêu hàng tháng'},
  {
    image: require('../../../assets/icons/eat.png'),
    title: 'eating',
    vntitle: 'Ăn uống',
  },
  {
    image: require('../../../assets/icons/taxi.png'),
    title: 'move',
    vntitle: 'Di chuyển',
  },
  {
    image: require('../../../assets/icons/house.png'),
    title: 'rent_house',
    vntitle: 'Thuê nhà',
  },
  {
    image: require('../../../assets/icons/water.png'),
    title: 'water_money',
    vntitle: 'Tiền nước',
  },
  {
    image: require('../../../assets/icons/phone.png'),
    title: 'telephone_fee',
    vntitle: 'Tiền điện thoại',
  },
  {
    image: require('../../../assets/icons/electricity.png'),
    title: 'electricity_bill',
    vntitle: 'Tiền điện',
  },
  {
    image: require('../../../assets/icons/gas.png'),
    title: 'gas_money',
    vntitle: 'Tiền ga',
  },
  {
    image: require('../../../assets/icons/tv.png'),
    title: 'tv_money',
    vntitle: 'Tiền TV',
  },
  {
    image: require('../../../assets/icons/internet.png'),
    title: 'internet_money',
    vntitle: 'Tiền internet',
  },
  {title: 'necessary_spending', vntitle: 'Chi tiêu cần thiết'},
  {
    image: require('../../../assets/icons/house_2.png'),
    title: 'repair_and_decorate_the_house',
    vntitle: 'Sửa và trang trí nhà',
  },
  {
    image: require('../../../assets/icons/tools.png'),
    title: 'vehicle_maintenance',
    vntitle: 'Bảo dưỡng xe',
  },
  {
    image: require('../../../assets/icons/doctor.png'),
    title: 'physical_examination',
    vntitle: 'Khám sức khỏe',
  },
  {
    image: require('../../../assets/icons/health-insurance.png'),
    title: 'insurance',
    vntitle: 'Bảo hiểm',
  },
  {
    image: require('../../../assets/icons/education.png'),
    title: 'education',
    vntitle: 'Giáo dục',
  },
  {
    image: require('../../../assets/icons/armchair.png'),
    title: 'housewares',
    vntitle: 'Đồ gia dụng',
  },
  {
    image: require('../../../assets/icons/toothbrush.png'),
    title: 'personal_belongings',
    vntitle: 'Đồ dùng cá nhân',
  },
  {
    image: require('../../../assets/icons/pet.png'),
    title: 'pet',
    vntitle: 'Thú cưng',
  },
  {
    image: require('../../../assets/icons/family.png'),
    title: 'family_service',
    vntitle: 'Dịch vụ gia đình',
  },
  {
    image: require('../../../assets/icons/box.png'),
    title: 'other_costs',
    vntitle: 'Chi phí khác',
  },
  {title: 'fun_play', vntitle: 'Vui - Chơi'},
  {
    image: require('../../../assets/icons/sports.png'),
    title: 'sport',
    vntitle: 'Thể thao',
  },
  {
    image: require('../../../assets/icons/diamond.png'),
    title: 'beautify',
    vntitle: 'Làm đẹp',
  },
  {
    image: require('../../../assets/icons/give-love.png'),
    title: 'gifts_donations',
    vntitle: 'Quà tặng & Quyên góp',
  },
  {
    image: require('../../../assets/icons/card-payment.png'),
    title: 'online_services',
    vntitle: 'Dịch vụ trực tuyến',
  },
  {
    image: require('../../../assets/icons/game-pad.png'),
    title: 'fun_play',
    vntitle: 'Vui - Chơi',
  },
  {title: 'investments_loans_debts', vntitle: 'Đầu tư, Cho vay & Nợ'},
  {
    image: require('../../../assets/icons/stats.png'),
    title: 'invest',
    vntitle: 'Đầu tư',
  },
  {
    image: require('../../../assets/icons/coins.png'),
    title: 'debt_collection',
    vntitle: 'Thu nợ',
  },
  {
    image: require('../../../assets/icons/loan.png'),
    title: 'borrow',
    vntitle: 'Đi vay',
  },
  {
    image: require('../../../assets/icons/borrow.png'),
    title: 'loan',
    vntitle: 'Cho vay',
  },
  {
    image: require('../../../assets/icons/pay.png'),
    title: 'pay',
    vntitle: 'Trả nợ',
  },
  {
    image: require('../../../assets/icons/commission.png'),
    title: 'pay_interest',
    vntitle: 'Trả lãi',
  },
  {
    image: require('../../../assets/icons/percentage.png'),
    title: 'earn_profit',
    vntitle: 'Thu lãi',
  },
  {title: 'revenue', vntitle: 'Khoản thu'},
  {
    image: require('../../../assets/icons/money.png'),
    title: 'salary',
    vntitle: 'Lương',
  },
  {
    image: require('../../../assets/icons/money-bag.png'),
    title: 'other_income',
    vntitle: 'Thu nhập khác',
  },
  {title: 'other', vntitle: 'Khác'},
  {
    image: require('../../../assets/icons/wallet-symbol.png'),
    title: 'money_transferred',
    vntitle: 'Tiền chuyển đi',
  },
  {
    image: require('../../../assets/icons/wallet.png'),
    title: 'money_transferred_to',
    vntitle: 'Tiền chuyển đến',
  },
  {
    image: require('../../../assets/icons/plus.png'),
    title: 'new_group',
    vntitle: 'Nhóm mới',
  },
];
