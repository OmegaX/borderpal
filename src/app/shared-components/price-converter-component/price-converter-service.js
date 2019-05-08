export default class PriceConverterService {
  constructor() {
    this.converterState = 'gas'; // default
    this.converterObj = {
      gas: {
        h1: 'Gas Converter',
        h2: 'Convert USD/gal to CAD/litre',
        divisor: 3.78541,
        inputValue: 3,
        inputLabel: 'USD/gal',
        outputLabel: 'CAD/litre',
        instructions_long: 'Enter a price in USD/gallon to convert',
        instructions_short: 'USD/gallon',
        img_bg: 'gas'
      },
      groceries: {
        h1: 'Groceries Converter',
        h2: 'Convert USD/lb to CAD/Kg',
        divisor: 0.453592,
        inputValue: 4,
        inputLabel: 'USD/pound',
        outputLabel: 'CAD/kilogram',
        instructions_long: 'Enter a price in USD/pound to convert',
        instructions_short: 'USD/pound',
        img_bg: 'groceries'
      }
    };
  }

  updateConverterObj(inputValue) {
    this.converterObj[this.converterState].inputValue = inputValue;
  }

  getNewConverterObj() {
    return this.converterObj;
  }

  setState(val) {
    this.converterState = val;
  }

  getState() {
    return this.converterState;
  }

  getConverterObj() {

    return this.converterObj;
  }
}
