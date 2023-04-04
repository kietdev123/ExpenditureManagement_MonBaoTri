import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import {StyleSheet, Button, View, Alert} from 'react-native';

function Todo({id, title, complete, reload}) {
  async function toggleComplete() {
    await firestore().collection('todos').doc(id).update({
      complete: !complete,
    });
  }

  async function deleteTodo() {
    await firestore().collection('todos').doc(id).delete();
    Alert.alert('xoa thanh cong');
    reload();
  }

  return (
    <>
      <List.Item
        checkbox
        style={styles.itemList}
        title={title}
        onPress={() => toggleComplete()}
        left={props => (
          <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
        )}
      />
      <View style={styles.button}>
        <Button
          color="#f194ff"
          title="Delete"
          onPress={() => deleteTodo()}></Button>
      </View>
    </>
  );
}

export default React.memo(Todo);

const styles = StyleSheet.create({
  itemList: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: 'gray',
  },
  container: {
    padding: 20,
  },
  button: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
  },
});
