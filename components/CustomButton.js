/* eslint-disable react/react-in-jsx-scope */
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';

const CustomButton = ({title, handler}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={handler}>
        <Text style={styles.textbtn}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
