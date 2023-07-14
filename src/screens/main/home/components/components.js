import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import {listType} from './list_type';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Item_Spending_Day = ({item, setStateForKey}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.spendingItemContainer}>
      <TouchableOpacity
        onPress={() => {
          setStateForKey('spending_selected_dateTime', {
            value: item.dateTime,
          });
          setStateForKey('spending_selected_friend', {
            value: item.friend,
          });
          setStateForKey('spending_selected_id', {
            value: item.id,
          });
          setStateForKey('spending_selected_image', {
            value: item.image,
          });
          setStateForKey('spending_selected_location', {
            value: item.location,
          });
          setStateForKey('spending_selected_money', {
            value: item.money,
          });
          setStateForKey('spending_selected_note', {
            value: item.note,
          });
          setStateForKey('spending_selected_type', {
            value: item.type,
          });
          setStateForKey('spending_selected_typeName', {
            value: item.typeName,
          });
          navigation.navigate('ViewListSpendingPage');
        }}>
        <View style={styles.spendingContentContainer}>
          <View style={styles.spendingDetailContainer}>
            <Image
              source={listType[item.type].image}
              resizeMode="contain"
              style={styles.spendingTypeImage}
            />
            <Text style={styles.spendingTypeName}>{item.typeName}</Text>
          </View>
          <View style={styles.spendingDetailContainer}>
            <Text>{item.money} VND</Text>
            <Icon
              color="black"
              name="md-chevron-forward-outline"
              style={styles.chevronIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const AppBar = ({
  profile,
  _monthSelected,
  limitSpendingToday,
  scrollRef,
  months,
  setMonthSelected,
  filter,
  spendingsOrigin,
}) => {
  return (
    <View>
      <View style={styles.appBarDivider} />

      <View style={styles.appBarContainer}>
        <Image
          source={
            profile.avatarURL === null
              ? profile.gender === 'male'
                ? require('../../../../assets/images/male.png')
                : require('../../../../assets/images/female.png')
              : {uri: profile.avatarURL}
          }
          style={styles.avatar}
        />
        <View style={styles.profileContainer}>
          <Text style={styles.greetingText}>Chào, {profile.fullname}</Text>
          {_monthSelected === 18 ? (
            <>
              <Text style={styles.spendText}>
                Hôm nay, bạn nên chi tiêu ít hơn
              </Text>
              <Text style={styles.limitText}>{limitSpendingToday} VNĐ</Text>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <FlatList
        ref={it => (scrollRef.current = it)}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({animated: true})
        }
        horizontal
        data={months}
        renderItem={({item, index}) => {
          return (
            <>
              {index === _monthSelected ? (
                <>
                  <View style={styles.selectedMonthContainer}>
                    <Text style={styles.selectedMonthText}>
                      {index === 18 ? 'Tháng này' : ''}
                      {index === 19 ? 'Tháng sau' : ''}
                      {index === 17 ? 'Tháng trước' : ''}
                      {index < 17
                        ? `${item.getMonth() + 1}/${item.getFullYear()}`
                        : ''}
                    </Text>
                    <View style={styles.monthDivider} />
                  </View>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setMonthSelected(index);
                      filter(
                        months[index],
                        spendingsOrigin,
                        Number(profile.moneyRange),
                      );
                    }}>
                    <View style={styles.monthContainer}>
                      <Text style={styles.monthText}>
                        {index === 18 ? 'Tháng này' : ''}
                        {index === 19 ? 'Tháng sau' : ''}
                        {index === 17 ? 'Tháng trước' : ''}
                        {index < 17
                          ? `${item.getMonth() + 1}/${item.getFullYear()}`
                          : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export const Home_Body = ({
  inputValue,
  outputValue,
  months,
  _monthSelected,
  spendings,
  setStateForKey,
}) => {
  return (
    <View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Số dư đầu</Text>
          <Text style={styles.balanceValue}>{inputValue} VND</Text>
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Số dư cuối</Text>
          <Text style={styles.balanceValue}>{outputValue} VND</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceRow}>
          <Text style={styles.balanceText}>
            {outputValue - inputValue > 0 ? 'Bạn có thêm ' : ''}
            {outputValue - inputValue < 0 ? 'Bạn đã chi ' : ''}
            {Math.abs(outputValue - inputValue)} VND
          </Text>
        </View>
      </View>

      <View style={styles.spendingTitleContainer}>
        <Text style={styles.spendingTitleText}>
          Danh sách chi tiêu {months[_monthSelected].getMonth() + 1}/
          {months[_monthSelected].getFullYear()}
        </Text>
      </View>

      {spendings.length === 0 ? (
        <>
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              Không có dữ liệu {months[_monthSelected].getMonth() + 1}/
              {months[_monthSelected].getFullYear()}!
            </Text>
          </View>
        </>
      ) : (
        spendings.map((item, index) => {
          return (
            <Item_Spending_Day
              key={index}
              item={item}
              setStateForKey={setStateForKey}
            />
          );
        })
      )}
      <View style={styles.bottomSpace} />
    </View>
  );
};

export const Loading_Body = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
};

const styles = StyleSheet.create({
  appBarDivider: {
    overflow: 'hidden',
    paddingBottom: 5,
  },
  appBarContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginRight: 12,
  },
  profileContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 18,
  },
  spendText: {
    fontSize: 16,
  },
  limitText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedMonthContainer: {
    width: 140,
    marginVertical: 8,
  },
  selectedMonthText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  monthDivider: {
    height: 1,
    backgroundColor: 'green',
    marginTop: 8,
  },
  monthContainer: {
    width: 140,
    marginVertical: 8,
  },
  monthText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 18,
  },
  balanceContainer: {
    backgroundColor: 'white',
    height: 120,
    borderRadius: 12,
    padding: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontSize: 20,
  },
  balanceValue: {
    fontSize: 20,
  },
  balanceDivider: {
    height: 1,
    backgroundColor: 'black',
    marginTop: 8,
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spendingTitleContainer: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  spendingTitleText: {
    fontSize: 20,
    color: '#a09fa1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noDataContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSpace: {
    height: 300,
  },
  loadingContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  spendingItemContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
  },
  spendingContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    height: 60,
  },
  spendingDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  spendingTypeImage: {
    width: 30,
  },
  spendingTypeName: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  chevronIcon: {
    color: 'black',
    fontSize: 26,
    marginLeft: 10,
  },
});
