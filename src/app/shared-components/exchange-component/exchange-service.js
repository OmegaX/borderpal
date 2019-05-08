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
    const url = '/server/get-exchange-rates.php';
    return this.http.get(url)
      .then((response) => {
        if (typeof response.data === 'object') {
          this.exchange = {
            ...this.exchange,
            rateUSD: response.data.CAD_USD,
            rateCAD: response.data.USD_CAD
          };
          return this.exchange;
        }
        this.exchange = {
          ...this.exchange,
          rateUSD: 0.74,
          rateCAD: 1.35
        };
        console.log("not object");
        return this.exchange;
      })
      .catch(() => {
        this.exchange = {
          ...this.exchange,
          rateUSD: 0.74,
          rateCAD: 1.35
        };
        console.log("error connecting");
        return this.exchange;
      });
  }
}

ExchangeService.$inject = ['$http', '$q'];
