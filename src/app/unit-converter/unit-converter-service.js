import unitsObject from './units';

export default class ConverterService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getUnits() {
    return unitsObject;
  }

  // rounding function accepts a value to round along with a precision
  round(number = 0, precision = 1) {
    const factor = 10 ** precision;
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  // convert temperatures C to F or F to C
  convertTemp(unit = 0, temp = 0) {
    if (unit === 'celsius') { // convert celcius to fahrenheit
      return (temp * (9 / 5)) + 32;
    }
    // convert fahrenheit to celcius
    return (temp - 32) * (5 / 9);
  }

  getExchangeRate() {
    return this.$http.get('https://api.fixer.io/latest?base=CAD')
      .then((response) => {
        if (typeof response.data === 'object') {
          return response.data;
        }
        // valid response
        return this.$q.reject(response.data);
      });
  }
}
