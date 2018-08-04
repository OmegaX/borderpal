export default class PriceConverterService {
  updateConverterObj(updatedObj) {
    this.converterObj = {
      ...this.converterObj,
      ...updatedObj
    };
  }

  setConverterType(type) {
    if (type === 'gas') {
      this.converterObj = {
        divisor: 3.78541,
        inputValue: 3,
        inputLabel: 'USD/gallon',
        outputLabel: 'CAD/litre',
        instructions_long: 'Enter a price in USD/gallon and click "Convert"',
        instructions_short: 'USD/gallon',
        img_bg: 'gas'
      };
    } else {
      this.converterObj = {
        divisor: 0.453592,
        inputValue: 10,
        inputLabel: 'USD/pound',
        outputLabel: 'CAD/kilogram',
        instructions_long: 'Enter a price in USD/pound and click "Convert"',
        instructions_short: 'USD/pound',
        img_bg: 'groceries'
      };
    }
  }

  getConverterObj() {
    return this.converterObj;
  }
}
