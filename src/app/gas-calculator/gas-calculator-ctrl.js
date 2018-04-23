export default class GasCalculatorCtrl {
  constructor(GasService, ExchangeService, $scope) {
    this.GasService = GasService;
    this.ExchangeService = ExchangeService;
    this.scope = $scope;
    this.init();
  }

  init() {
    this.gallonUSD = 3;
    this.statesArray = this.GasService.getStates();
    this.scope.$watchCollection(() => this.ExchangeService.getExchangeObj(), () => {
      this.exchange = this.ExchangeService.getExchangeObj();
      this.convertGas();
      return () => this.exchange;
    });
  }

  convertGas(gallonUSD = this.gallonUSD) {
    this.gallonUSD = gallonUSD;
    const gallonCAD = gallonUSD * this.exchange.rateCADtotal;
    this.litreCAD = gallonCAD / 3.78541;
  }

  getGasPrices() {
    this.gasObject = {};
    const { abbr } = this.selectedState;
    this.GasService.getGasPrices(abbr)
      .then((response) => {
        this.gasObject = response;
      }, () => {});
  }
}

GasCalculatorCtrl.$inject = ['GasService', 'ExchangeService', '$scope'];
