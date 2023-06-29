import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Image,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import {connect, setStateForKey, useStateX} from 'react-native-redux';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons.js';

const colors = [
  "#164B60",
  "#1B6B93",
  "#4FC0D0",
  "#A2FF86",
];

const EditAddFriendPage = ({navigation}) => {
  const friends = useStateX('spending_selected_friend.value');
  console.log('kiet debug ', friends);
  const [text, onChangeText] = useState('');

  
  const FriendsComponent = () => {
    return (
      <>
        <FlatList
          data={friends}
          renderItem={({item, index}) => (
            <>
              <View style={styles.typeItem}>
                {/* <Text style={styles.item}>{item.image}</Text> */}
                <View style={{
                    flexDirection : 'row',
                   
                  }}>
                  <View style={{
                    width : 40, height : 40,
                    justifyContent : 'center',
                    borderRadius : 30, backgroundColor : colors[index % 3]}}>
                    <Text style={{
                      margin : 'auto',
                      fontSize : 20,
                      textAlign : 'center',
                      fontWeight : 'bold', color : 'white'}}>{item[0].toUpperCase()}</Text>
                  </View>
                  
                  <View style={{width : 12}}></View>
                  <View style={styles.typeItem_text}>
                    <Text style={styles.item}>{item}</Text>
                  </View>
                </View>
               
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      'new ',
                      friends.filter(friend => friend !== item),
                    );
                    setStateForKey('spending_selected_friend', {
                      value: friends.filter(friend => friend !== item),
                    });
                  }}>
                  <View style={{backgroundColor : '#E1ECC8', borderRadius : 30}}>
                      <Icon name="close" size={20} />
                  </View>
                  
                </TouchableOpacity>
              </View>
              {/* <View
                styles={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 24,
                  backgroundColor: 'yellow',
                }}>
                <Text style={{fontSize: 24}}>{item}</Text>
                <Text style={{fontSize: 24}}>{item}</Text>
              </View> */}
            </>
          )}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Thêm Bạn Bè</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.save}>Xong</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            ...styles.inputContainer,
            marginLeft: 24,
            marginRight: 24,
            borderRadius: 10,
            height: 55,
            backgroundColor: COLORS.grey,
            // flexDirection: 'row',
            borderWidth: 0.5,
            marginVertical: 10,
          }}>
          <TextInput
            style={{height: 55}}
            onChangeText={onChangeText}
            onSubmitEditing={event => {
              //   Alert.alert(event.nativeEvent.text);
              console.log('mm ' + [...friends, text]);
              onChangeText('');
              setStateForKey('spending_selected_friend', {
                //   value: friends.push(text),
                value: [...friends, text],
              });
            }}
            value={text}
            placeholder="Điền tên"></TextInput>
        </View>
      </View>

      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <View
          style={{
            backgroundColor: '#fff',
            // width: 300,
            height: 1,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.content}></View>
        {FriendsComponent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  typeItem_text: {
    alignSelf: 'center',
  },
  item: {
    fontSize: 20,
    marginRight: 12,
  },
  typeItem: {
    flex: 1,
    justifyContent: 'space-between',
    // alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    // height: 50,
    // height: 40,
    // backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  save: {
    fontSize: 16,
    color: 'blue',
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  moreButton: {
    height: 40,
    // backgroundColor: '#eeeeee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginEnd: 10,
    marginStart: 10,
  },
});

export default connect(EditAddFriendPage);
