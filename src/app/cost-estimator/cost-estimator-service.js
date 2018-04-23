import provincialTaxes from './provincial-taxes';
import tripExemptions from './trip-exemptions';
import popoverText from './popover-text';
import dutyCategories from './duty-categories';

export default class EstimatorService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.provincialTaxes = provincialTaxes;
    this.tripExemptions = tripExemptions;
    this.popoverText = popoverText;
    this.dutyCategories = dutyCategories;
  }

  // rounding function accepts a value to round and a precision
  round(number = 0, precision = 1) {
    const factor = 10 ** precision;
    const tempNumber = number * factor;
    this.roundedTempNumber = Math.round(tempNumber);
    return this.roundedTempNumber / factor;
  }

  getDutyCategories() {
    this.dutyCategories = dutyCategories;
    return this.dutyCategories;
  }

  getPopoverText() {
    return this.popoverText;
  }

  getProvincialTaxes() {
    return this.provincialTaxes;
  }

  getTripExemptions() {
    return this.tripExemptions;
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

EstimatorService.$inject = ['$http', '$q'];
