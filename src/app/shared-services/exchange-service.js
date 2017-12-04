export default class ExchangeService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  callExchangeAPI() {
    return this.$http.get('https://api.fixer.io/latest?base=CAD')
      .then((response) => {
        if (typeof response.data === 'object') {
          const exchangeObj = {
            date: response.data.date,
            rates: response.data.rates
          };
          return exchangeObj;
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }
}
