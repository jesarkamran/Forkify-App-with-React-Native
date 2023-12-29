/* eslint-disable react/react-in-jsx-scope */
import {Text, View} from 'react-native';
import styles from './Styles';
import fracty from 'fracty/fracty';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Item = ({item}) => {
  item.quantity = Number(item.quantity?.toFixed(4));
  return (
    <View style={styles.ingredientsList}>
      <AntDesign name="check" style={styles.tickIcon} />
      <Text style={styles.IngredientsText}>
        {item.quantity ? fracty(item.quantity).toString() : ''}
      </Text>

      <Text style={styles.IngredientsText}>{item.unit}</Text>
      <Text style={styles.IngredientsText}>{item.description}</Text>
    </View>
  );
};

export default Item;
