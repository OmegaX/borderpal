import statesArray from './us-states';

export default class GasService {
  constructor($http, $q) {
    this.statesArray = statesArray;
    this.$http = $http;
    this.$q = $q;
  }

  getStates() {
    return this.statesArray;
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
