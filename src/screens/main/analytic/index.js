import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import React, {useState, useEffect, useRef} from 'react';
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
          spending += item.money;
        }
        if (typeChart == 'income' && item.money > 0) {
          temp_spendings.push(item);
          income += item.money;
        }
      }
    }

    console.log(temp_spendings);

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

  return (
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
              {123}
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
              {123}
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
              {123}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
export default App;
