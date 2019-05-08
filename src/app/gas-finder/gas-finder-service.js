import statesArray from './us-states';

export default class GasFinderService {
  constructor($http, $q) {
    this.statesArray = statesArray;
    this.$http = $http;
    this.$q = $q;
  }

  getStates() {
    return this.statesArray;
  }

  getGasPrices(state) {
    const url = '/server/getgasprices.php';
    return this.$http.post(url, state)
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        return this.$q.reject(response.data);
      });
  }
}

GasFinderService.$inject = ['$http', '$q'];
