import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR  = '#868686';
const ICON_SIZE   = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  };
  
  handleThemePress = () => {
    this.props.navigation.navigate('Themes');
  }

  handleSitePress = () => {
    Linking.openURL('http://fixer.io').catch(() => 
      this.props.alertWithType("error", "Sorry!", "Link can't be opened right now"));
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle='default' />
        <ListItem 
          customIcon={<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />}
          text="Themes"
          onPress={this.handleThemePress} />
        <Separator />
        <ListItem 
          customIcon={<Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />}
          text="Fixer.io" 
          onPress={this.handleSitePress} />
      </ScrollView>

    );
  }



}

export default connectAlert(Options);