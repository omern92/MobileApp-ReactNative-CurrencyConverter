import React from 'react';
import propTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';

const Container = ({children, backgroundColor}) => {
  const containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor: backgroundColor });
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={containerStyles}>
        {children}
      </View>  
    </TouchableWithoutFeedback>
  );
}

Container.propTypes = {
  children: propTypes.any,
};

export default Container;