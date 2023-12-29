/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './Styles';

const NextButton = ({nextButtonHandler, page}) => {
  return (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.pageBtn}
      onPress={nextButtonHandler}>
      <Text style={styles.pageBtnTxt}>
        Page {`${page} `}
        <Feather name={'arrow-right'} style={styles.pageBtnIcon} />
      </Text>
    </TouchableOpacity>
  );
};

export default NextButton;
