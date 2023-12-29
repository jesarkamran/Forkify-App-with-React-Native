/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const IconButton = ({name, handler, style}) => {
  if (name === 'bookmark' || name === 'bookmark-o') {
    return (
      <TouchableOpacity style={style.btn} onPress={handler}>
        <Text>
          <FontAwesome name={name} style={style.title} />
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={style.btn} onPress={handler}>
      <Text>
        <AntDesign name={name} style={style.title} />
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
