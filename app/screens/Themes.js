import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import { changePrimaryColor } from '../actions/theme';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $green: '$primaryGreen',
  $orange: '$primaryOrange',
  $purple: '$primaryPurple',
});

class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };
  
  handleThemePress = (color) => {
    this.props.dispatch(changePrimaryColor(color));
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle='default' />
        <ListItem 
          text="Blue"
          selected
          checkmark={false}
          iconBackground={styles.$blue}
          onPress={() => this.handleThemePress(styles.$blue)} />
        <Separator />
        <ListItem 
          text="Orange" 
          selected
          checkmark={false}
          iconBackground={styles.$orange}
          onPress={() => this.handleThemePress(styles.$orange)} />
        <ListItem 
          text="Green"
          selected
          checkmark={false}
          iconBackground={styles.$green}
          onPress={() => this.handleThemePress(styles.$green)} />
        <Separator />
        <ListItem 
          text="Purple"
          selected
          checkmark={false}
          iconBackground={styles.$purple}
          onPress={() => this.handleThemePress(styles.$purple)} />
        <Separator />
      </ScrollView>

    );
  }
}

export default connect()(Themes);