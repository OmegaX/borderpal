import dutyCategories from './duty-categories';
import provincialTaxes from './provincial-taxes';
import tripExemptions from './trip-exemptions';
import popoverText from './popover-text';

export default class EstimatorService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  // rounding function accepts a value to round and a precision
  round(number = 0, precision = 1) {
    const factor = 10 ** precision;
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  getExchangeRate() {
    return this.$http.get('https://api.fixer.io/latest?base=USD')
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }

  getDutyCategories() {
    return dutyCategories;
  }

  getPopoverText() {
    return popoverText;
  }

  getProvincialTaxes() {
    return provincialTaxes;
  }

  getTripExemptions() {
    return tripExemptions;
  }

  getUSTaxRates(zip) {
    const url = 'http://localhost/server/getustaxrate.php';
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
