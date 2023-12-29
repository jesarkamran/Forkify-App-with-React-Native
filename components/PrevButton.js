/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './Styles';

const PrevButton = ({prevButtonHandler, page}) => {
  return (
    <TouchableOpacity style={styles.pageBtn} onPress={prevButtonHandler}>
      <Text style={styles.pageBtnTxt}>
        <Feather name={'arrow-left'} style={styles.pageBtnIcon} /> Page{' '}
        {`${page} `}
      </Text>
    </TouchableOpacity>
  );
};

export default PrevButton;
