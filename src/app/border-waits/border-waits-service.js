export default class BorderService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getCDNBorderWaits() {
    return this.$http.get('https://www.cbsa-asfc.gc.ca/bwt-taf/bwt-eng.json')
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data.waitTimes;
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }


  getUSBorderWaits() {
    return this.$http.get('https://apps.cbp.gov/bwt/bwt.xml')
      .then((response) => {

          return response.data;
   
      });
  }
}
