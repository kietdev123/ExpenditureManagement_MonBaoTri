import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  processColor,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
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
// Import libraries for Tab View and Charts (e.g., react-native-tab-view, react-native-svg, react-native-chart-kit)

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDayFrom, setSelectedDayFrom] = useState(
    new Date().getDate() - 7,
  );
  const [selectedDayTo, setSelectedDayTo] = useState(new Date().getDate());
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  // Sample data for expenses and income

  const formatDate = date => {
    return format(date, 'dd/MM/yyyy');
  };

  // Handle previous date button press
  const handlePrevDate = () => {
    if (selectedTab === 'week') {
      setSelectedDayTo(subWeeks(selectedDayTo, 1));
      setSelectedDayFrom(subWeeks(selectedDayFrom, 2));
    } else if (selectedTab === 'month') {
      setSelectedDayTo(subMonths(selectedDayTo, 1));
      setSelectedDayFrom(subMonths(selectedDayFrom, 2));
    } else if (selectedTab === 'year') {
      setSelectedDayTo(subYears(selectedDayTo, 1));
      setSelectedDayFrom(subYears(selectedDayFrom, 2));
    }
  };

  // Handle next date button press
  const handleNextDate = () => {
    if (selectedTab === 'week') {
      setSelectedDayTo(addWeeks(selectedDayTo, 1));
      setSelectedDayFrom(addWeeks(selectedDayFrom, 1));
    } else if (selectedTab === 'month') {
      setSelectedDayTo(addMonths(selectedDayTo, 1));
      setSelectedDayFrom(addMonths(selectedDayFrom, 1));
    } else if (selectedTab === 'year') {
      setSelectedDayTo(addYears(selectedDayTo, 1));
      setSelectedDayFrom(addYears(selectedDayFrom, 1));
    }
  };

  // Render chart based on selected tab (Chi tieu, Thu Nhap)
  const renderChart = () => {
    let chartData = [];
    if (selectedTab === 0) {
      if (selectedSubTab === 0) {
        // Logic to fetch and format data for weekly expenses
        chartData = [
          {category: 'Category 1', amount: 100},
          {category: 'Category 2', amount: 200},
          {category: 'Category 3', amount: 150},
        ];
      } else if (selectedSubTab === 1) {
        // Logic to fetch and format data for weekly income
        chartData = [
          {category: 'Category 1', amount: 300},
          {category: 'Category 2', amount: 250},
          {category: 'Category 3', amount: 150},
        ];
      }
    } else if (selectedTab === 1) {
      if (selectedSubTab === 0) {
        // Logic to fetch and format data for monthly expenses
        chartData = [
          {category: 'Category 1', amount: 400},
          {category: 'Category 2', amount: 350},
          {category: 'Category 3', amount: 250},
        ];
      } else if (selectedSubTab === 1) {
        // Logic to fetch and format data for monthly income
        chartData = [
          {category: 'Category 1', amount: 500},
          {category: 'Category 2', amount: 450},
          {category: 'Category 3', amount: 300},
        ];
      }
    } else if (selectedTab === 2) {
      if (selectedSubTab === 0) {
        // Logic to fetch and format data for yearly expenses
        chartData = [
          {category: 'Category 1', amount: 1200},
          {category: 'Category 2', amount: 1500},
          {category: 'Category 3', amount: 800},
        ];
      } else if (selectedSubTab === 1) {
        // Logic to fetch and format data for yearly income
        chartData = [
          {category: 'Category 1', amount: 1800},
          {category: 'Category 2', amount: 2000},
          {category: 'Category 3', amount: 1500},
        ];
      }
    }

    // Use chart library to create a pie chart with colors and icons representing categories
    return (
      <PieChart
        data={chartData}
        width={300}
        height={300}
        accessor="amount"
        backgroundColor="transparent"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Thay đổi thành màu xanh dương
        }}
        style={{marginVertical: 8, borderRadius: 16}}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Tab View */}
      {/* Render the selected tab view (week, month, year) */}

      {/* Add tab indicators for week, month, year */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 16,
        }}>
        <TouchableOpacity
          onPress={() => setSelectedTab(0)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 0 ? 'gray' : 'transparent',
          }}>
          <Text style={{color: selectedTab === 0 ? 'white' : 'black'}}>
            Tuan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(1)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 1 ? 'gray' : 'transparent',
          }}>
          <Text style={{color: selectedTab === 1 ? 'white' : 'black'}}>
            Thang
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedTab === 2 ? 'gray' : 'transparent',
          }}>
          <Text style={{color: selectedTab === 2 ? 'white' : 'black'}}>
            Nam
          </Text>
        </TouchableOpacity>
      </View>
      {/* Add sub tabs for Chi tieu and Thu Nhap */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 16,
        }}>
        <TouchableOpacity
          onPress={() => setSelectedSubTab(0)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedSubTab === 0 ? 'gray' : 'transparent',
          }}>
          <Text style={{color: selectedSubTab === 0 ? 'white' : 'black'}}>
            Chi tieu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedSubTab(1)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: selectedSubTab === 1 ? 'gray' : 'transparent',
          }}>
          <Text style={{color: selectedSubTab === 1 ? 'white' : 'black'}}>
            Thu Nhap
          </Text>
        </TouchableOpacity>
      </View>
      {/* Render the selected tab content */}
      <ScrollView style={{flex: 1}}>
        {/* Render content based on selectedTab */}
        {selectedTab === 0 && (
          <View>
            {/* Logic to render weekly expenses or income */}
            {selectedSubTab === 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        {selectedTab === 1 && (
          <View>
            {/* Logic to render monthly expenses or income */}
            {selectedSubTab === 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        {selectedTab === 2 && (
          <View>
            {/* Logic to render yearly expenses or income */}
            {selectedSubTab === 0 ? (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={handlePrevDate}>
                    <Text>{formatDate(selectedDayFrom)}</Text>
                  </TouchableOpacity>
                  <Text style={{marginHorizontal: 10}}> - </Text>
                  <TouchableOpacity onPress={handleNextDate}>
                    <Text>{formatDate(selectedDayTo)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      {/* Display the chart component */}
      <View style={{alignItems: 'center'}}>{renderChart()}</View>
    </View>
  );
};

export default App;
