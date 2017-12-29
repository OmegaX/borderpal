export default class ExchangeService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  callExchanegeAPI() {
    return this.$http.get('https://api.fixer.io/latest?base=CAD')
      .then((response) => {
        if (typeof response.data === 'object') {
          return {
            date: response.data.date,
            rates: response.data.rates
          };
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }
}

ExchangeService.$inject = ['$http', '$q'];
