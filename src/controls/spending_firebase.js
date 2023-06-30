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
    Alert.alert('Thêm thành công');
  },
  updateSpending: async (
    id,
    _money,
    _dateTime,
    _note,
    _type,
    _typeName,
    _location,
    _friends,
    _image,
  ) => {
    await firestore().collection('spendings').doc(id).update({
      money: _money,
      dateTime: _dateTime,
      note: _note,
      type: _type,
      typeName: _typeName,
      location: _location,
      friend: _friends,
      image: _image,
    });
    Alert.alert('Cập nhật thành công');
  },
  deleteSpending: async (id) => {
    await firestore().collection('spendings').doc(id).delete();
    Alert.alert('Xóa thành công');
  },
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
  getProfile: async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const {uid} = currentUser;
      await firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            console.log('documentSnapshot:', userData);
            const profile = {
              fullname: userData.fullname,
              moneyRange: userData.moneyRange,
              gender: userData.gender,
              dateofbirth: moment(userData.dateofbirth),
              avatarURL: userData.avatarURL,
            };
            return profile;
          } else {
            console.log('Không tìm thấy thông tin người dùng.');
            const profile = {
              fullname: null,
              moneyRange: null,
              gender: null,
              dateofbirth: null,
            };
            return profile;
          }
        })
        .catch(error => {
          console.log('Lỗi khi lấy thông tin người dùng:', error);
        });
    } else {
      showMessage({
        message:
          'Người dùng chưa đăng nhập. Vui lòng thoát ra và đăng nhập lại!',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
      });
    }
  }, 
  updateInfo: async () => {},
  updateWalletMoney: async () => {},
  addWalletMoney: async () => {},
  uploadImage: async () => {},
};
export default SpendingFirebase;
