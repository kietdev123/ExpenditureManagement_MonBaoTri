import {Text, View} from 'react-native';
import {connect} from 'react-native-redux';
import {useStateX} from 'react-native-redux';

const HomeScreen = () => {
  const userName = useStateX('user.name');
  return (
    <>
      <View>
        <Text>Home Screen</Text>
        <Text>{userName}</Text>
      </View>
    </>
  );
};

export default connect(HomeScreen);
