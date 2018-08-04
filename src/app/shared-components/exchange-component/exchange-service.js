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
    const url = 'https://free.currencyconverterapi.com/api/v5/convert?q=CAD_USD,USD_CAD&compact=y';
    return this.http.get(url)
      .then((response) => {
        if (typeof response.data === 'object') {
          this.exchange = {
            ...this.exchange,
            rateCAD: response.data.USD_CAD.val,
            rateUSD: response.data.CAD_USD.val
          };
          return this.exchange;
        }
        // invalid response
        return this.q.reject(response.data);
      });
  }
}

ExchangeService.$inject = ['$http', '$q'];
