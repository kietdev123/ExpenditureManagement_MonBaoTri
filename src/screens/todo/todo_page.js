import {
  Text,
  View,
  Button,
  Alert,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-native-redux';
import {useStateX} from 'react-native-redux';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import Todo from './components/item_todo.js';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';
import {ListItem, List} from 'react-native-elements';

const ToDoPage = () => {
  const userName = useStateX('user.name');

  const [todo, setTodo] = useState('');
  const ref = firestore().collection('todos');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);
      // console.log(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addTodo() {
    Alert.alert('start add title');
    await ref.add({
      title: todo,
      complete: false,
    });
    Alert.alert('done add title');
  }

  async function getTodos() {
    setLoading(true);
    await ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
    setLoading(false);
  }

  const body = () => {
    if (loading) {
      return <ActivityIndicator size="large"></ActivityIndicator>;
    }

    // if (error) {
    //   return <Text>{error}</Text>;
    // }

    console.log(todos);
    return (
      <FlatList
        // style={{flex: 1}}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Todo {...item} reload={getTodos} />}
      />
    );
  };

  return (
    <>
      <SafeAreaView>
        <Text>ToDo Screen</Text>
        <Text>{userName}</Text>
        <TextInput label={'New Todo'} value={todo} onChangeText={setTodo} />
        <Button title="Add TODO" onPress={() => addTodo()}></Button>
        {body()}
      </SafeAreaView>
    </>
  );
};

export default connect(ToDoPage);
