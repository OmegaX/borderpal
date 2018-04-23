export default class ExchangeService {
  constructor($http, $q) {
    this.http = $http;
    this.q = $q;
    this.init();
  }

  init() {
    this.exchange = { fee: 2.5 };
  }

  setExchangeObj(updatedObj) {
    this.exchange = {
      ...this.exchange,
      ...updatedObj
    };
  }

  getExchangeObj() {
    return this.exchange;
  }

  callExchangeAPI() {
    return this.http.get('https://api.fixer.io/latest?base=CAD')
      .then((response) => {
        if (typeof response.data === 'object') {
          this.exchange = {
            ...this.exchange,
            date: response.data.date,
            rateUSD: response.data.rates.USD,
            rateEUR: response.data.rates.EUR,
            rateGBP: response.data.rates.GBP,
            rateCNY: response.data.rates.CNY
          };
          return this.exchange;
        }
        // valid response
        return this.q.reject(response.data);
      });
  }
}

ExchangeService.$inject = ['$http', '$q'];
