export default class GasFinderCtrl {
  constructor(GasFinderService, PriceConverterService) {
    this.gasFinderService = GasFinderService;
    this.priceConverterService = PriceConverterService;
    this.init();
  }

  init() {
    this.statesArray = this.gasFinderService.getStates();
    this.priceConverterService.setConverterType('gas');
  }

  // user clicks on a USD/gallon gas price in table
  convertGas(inputValue) {
    // only the input value changes
    const newConverterObj = {
      inputValue
    };
    // update input value for re-calculation
    this.priceConverterService.updateConverterObj(newConverterObj);
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
