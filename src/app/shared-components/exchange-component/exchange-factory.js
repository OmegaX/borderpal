export default function ExchangeFactory($http, $q) {
  let exchange = { fee: 2.5 };
  return {
    setExchangeObj(updatedObj) {
      exchange = {
        ...exchange,
        ...updatedObj
      };
    },
    getExchangeObj() {
      return exchange;
    },
    callExchangeAPI() {
      return $http.get('https://api.fixer.io/latest?base=CAD')
        .then((response) => {
          if (typeof response.data === 'object') {
            exchange = {
              ...exchange,
              date: response.data.date,
              rateUSD: response.data.rates.USD
            };
            return exchange;
          }
          // valid response
          return $q.reject(response.data);
        });
    }
  };
}
