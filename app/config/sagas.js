import { takeEvery, select, call, put } from 'redux-saga/effects';
import { 
  SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_ERROR, CONVERSION_RESULT
 } from '../actions/currencies';

const getLatestRates = (currency) => (
  fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`)
);

const fetchLatestConversionRates = function* (action) {
  try {
    let currency = action.currency;
    if (currency === undefined) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRates, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }

  } catch(err) {
    yield put({ type: CONVERSION_ERROR, error: err.message });
  } 
}
 
export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
}