export default class CostEstimatorService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getUSTaxRates(zip) {
    const url = './server/getustaxrate.php';
    return this.$http.post(url, zip)
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // invalid response
        return this.$q.reject(response.data);
      });
  }
}

CostEstimatorService.$inject = ['$http', '$q'];
