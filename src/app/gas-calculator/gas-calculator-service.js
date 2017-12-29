import statesArray from './us-states';

export default class GasService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getStates() {
    return statesArray;
  }

  getExchangeRate() {
    return this.$http.get('https://api.fixer.io/latest?base=USD')
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        return this.$q.reject(response.data);
      });
  }

  getGasPrices(state) {
    const url = './server/getgasprices.php';
    return this.$http.post(url, state)
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        return this.$q.reject(response.data);
      });
  }
}

GasService.$inject = ['$http', '$q'];
