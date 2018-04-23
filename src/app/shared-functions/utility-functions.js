import unitsObject from '../unit-converter/units';

export default function Utilities() {
  return {
    round(number = 0, precision = 1) {
      const factor = 10 ** precision;
      const tempNumber = number * factor;
      const roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
    },
    convertTemp(unit = 0, temp = 0) {
      // convert celcius to fahrenheit
      if (unit === 'C') {
        return (temp * (9 / 5)) + 32;
      }
      // convert fahrenheit to celcius
      return (temp - 32) * (5 / 9);
    },
    getUnits() {
      return unitsObject;
    }
  };
}