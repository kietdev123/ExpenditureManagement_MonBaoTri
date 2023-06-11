import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
const SpendingFirebase = {
  addSpending: async (
    _money,
    _dateTime,
    _note,
    _type,
    _typeName,
    _location,
    _friends,
    _image,
  ) => {
    console.log(
      _money,
      _dateTime,
      _note,
      _type,
      _typeName,
      _location,
      _friends,
      _image,
    );
    const ref = firestore().collection('spendings');
    await ref.add({
      money: _money,
      dateTime: _dateTime,
      note: _note,
      type: _type,
      typeName: _typeName,
      location: _location,
      friend: _friends,
      image: _image,
    });
    Alert.alert('done add spending');
  },
  updateSpending: async () => {},
  deleteSpending: async () => {},
  getSpendingList: async () => {
    const ref = firestore().collection('spendings');
    const list = [];
    ref.onSnapshot(querySnapshot => {
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
    });
    return list;
  },
  updateInfo: async () => {},
  updateWalletMoney: async () => {},
  addWalletMoney: async () => {},
  uploadImage: async () => {},
};
export default SpendingFirebase;