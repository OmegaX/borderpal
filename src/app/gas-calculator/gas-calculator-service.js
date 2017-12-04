import statesArray from './us-states';

export default class GasControllerService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getStates() {
    return statesArray;
  }

  // rounding function accepts a value to round and a precision
  round(number = 0, precision = 1) {
    const factor = 10 ** precision;
    const tempNumber = number * factor;
    this.roundedTempNumber = Math.round(tempNumber);
    return this.roundedTempNumber / factor;
  }

  getExchangeRate() {
    return this.$http.get('https://api.fixer.io/latest?base=USD')
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }

  getGasPrices(state) {
    const url = 'http://localhost/server/getgasprices.php';
    return this.$http.post(url, state)
      .then((response) => {
        // if (typeof response.data === 'object') {
          return response.data;
        // }
        // valid response
        // return this.$q.reject(response.data);
      });
  }
}
