import dutyCategories from "./duty-categories.js";
import provincialTaxes from "./provincial-taxes.js";
import tripExemptions from "./trip-exemptions.js";
import popoverText from "./popover-text.js";

export default class EstimatorService {

  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  createItemObject(itemNumber, dutyCategory) {
    return {
      number: itemNumber,
      desc: null,
      priceUSD: null,
      taxableUS: true,
      taxableCDN: true,
      dutyCategory: dutyCategory
    };
  }

  // rounding function accepts a value to round and a precision
  round(number = 0, precision = 1) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  getExchangeRate() {
    return this.$http.get('http://api.fixer.io/latest?base=USD')
      .then (response => {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
        // invalid response
        return this.$q.reject(response.data);
        }       
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
    let url = 'http://localhost/server/getustaxrate.php';
    return this.$http.post(url, zip)
      .then (response => {
        if (typeof response.data === 'object') {
          return response.data;
        } else {
        // invalid response
        return this.$q.reject(response.data);
        }
      });
  }



}