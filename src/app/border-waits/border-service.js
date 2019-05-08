import borderArrayUS from './info-objects/us-border-info';
import borderArrayCAN from './info-objects/can-border-info';
import trafficCamArray from './info-objects/traffic-cam-info';

export default class BorderService {
  constructor($http, $q, $sce) {
    this.borderArrayUS = borderArrayUS;
    this.borderArrayCAN = borderArrayCAN;
    this.trafficCamArray = trafficCamArray;
    this.$http = $http;
    this.$q = $q;
    this.$sce = $sce;
  }

  getOurBorderArrayCAN() {
    return this.borderArrayCAN;
  }

  getOurBorderArrayUS() {
    return this.borderArrayUS;
  }

  getTrafficCams() {
    return this.trafficCamArray;
  }

  getCDNBorderWaits() {
    const url = './server/get-border-waits-canada.php';
    return this.$http.get(url)
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // invalid response
        return this.$q.reject(response.status);
      });
  }

  getTrustedResourceUrl(url) {
    return this.$sce.getTrustedResourceUrl(url);
  }

  getUSBorderWaits() {
    const url = './server/get-border-waits-usa.php';
    return this.$http.post(url)
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // invalid response
        return this.$q.reject(response.status);
      });
  }

  getProtectedCams(obj) {
    const url = './server/get-cams.php';
    const stringObj = JSON.stringify(obj);
    console.log(stringObj);
    return this.$http.post(url, stringObj)
      .then((response) => {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log(response.data);
          return response.data;
        }
        // invalid response
        return this.$q.reject(response.status);
      });
  }
}

BorderService.$inject = ['$http', '$q', '$sce'];
