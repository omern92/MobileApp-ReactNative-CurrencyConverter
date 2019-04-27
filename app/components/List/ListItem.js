import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';

import Icon from './Icon';
import styles from './styles';

const ListItem = ({ 
  text, selected = false, onPress, visible = true, checkmark = true, customIcon = null,
  iconBackground = null,
}) => (
  <TouchableHighlight 
    onPress={onPress} 
    underlayColor={styles.$underlayColor}>
    <View 
      style={styles.row}>
      <Text 
        style={styles.text}>{text}
      </Text>
      {selected ?  <Icon 
                      visible={visible} 
                      checkmark={checkmark} 
                      iconBackground={iconBackground}
                      /> 
                      : <Icon />}
      {customIcon}
    </View>
  </TouchableHighlight>
);

ListItem.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  checkmark: PropTypes.bool,
  selected: PropTypes.bool,
  visible: PropTypes.bool,
  customIcon: PropTypes.element,
  iconBackground: PropTypes.string,
};

export default ListItem;