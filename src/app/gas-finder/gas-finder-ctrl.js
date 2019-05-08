import Utilities from '../shared-functions/utility-functions';

export default class GasFinderCtrl {
  constructor(GasFinderService, PriceConverterService) {
    this.gasFinderService = GasFinderService;
    this.priceConverterService = PriceConverterService;
    this.init();
  }

  init() {
    this.statesArray = this.gasFinderService.getStates();
    this.priceConverterService.setState('gas');
  }

  // user clicks on a USD/gallon gas price in table
  convertGas(clickedValue) {
    // only the input value changes
    let inputValue = parseFloat(clickedValue);

    inputValue = Utilities.isNumeric(inputValue) ? inputValue : 0;

    // update input value for re-calculation
    this.priceConverterService.updateConverterObj(inputValue);
    var tammy = this.priceConverterService.getConverterObj();
    console.log(tammy);

    //console.log(newConverterObj);

  }

  // get cheapest gas prices from scraper when user selects a state
  getGasPrices() {
    this.gasObject = {};
    const { abbr } = this.selectedState;
    this.gasFinderService.getGasPrices(abbr)
      .then((response) => {
        this.gasObject = response;
      }, () => {});
  }
}

GasFinderCtrl.$inject = ['GasFinderService', 'PriceConverterService'];
