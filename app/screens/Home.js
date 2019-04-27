import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { connectAlert } from '../components/Alert';
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';


class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    isFetching: PropTypes.bool,
    primaryColor: PropTypes.string,
    currencyError: PropTypes.string,
    alertWithType: PropTypes.func,
  };
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== 
        this.props.currencyError) {
          this.props.alertWithType('error', 'Error', nextProps.currencyError);
        }
  }

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  handlePressBaseCurr = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency',
      type: 'base' })
  }

  handlePressQuoteCurr = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency',
      type: 'quote' })
  }
  
  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  }

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  }

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }
    const primaryColor = this.props.primaryColor;

    return (      
      <Container backgroundColor={primaryColor}>
        <StatusBar 
            translucent={false} barStyle="light-content"
          />
        <Header   
            onPress={this.handleOptionsPress} 
          />
        <KeyboardAvoidingView behavior="padding">

        <Logo tintColor={primaryColor} />
        <InputWithButton 
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurr}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={primaryColor} 
          />
        <InputWithButton 
            editable={false}
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurr}
            defaultValue={quotePrice} 
            textColor={primaryColor} 
          />
        <LastConverted 
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
          />
        <ClearButton 
            text="Reverse Currency"
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>

      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const currencyError = state.currencies.error;

  return {
    baseCurrency,
    quoteCurrency,
    currencyError,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ?
      new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
  }
}
export default connect(mapStateToProps)(connectAlert(Home));

