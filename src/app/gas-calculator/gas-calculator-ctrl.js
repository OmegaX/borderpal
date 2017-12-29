export default class GasCalculatorCtrl {
  constructor(GasService, ExchangeFactory, $scope) {
    this.GasService = GasService;
    this.ExchangeFactory = ExchangeFactory;
    this.scope = $scope;
    this.init();
  }

  init() {
    this.statesArray = this.GasService.getStates();
    this.exchange = this.ExchangeFactory.getExchangeObj();
    this.scope.$watchCollection(() => this.ExchangeFactory.getExchangeObj(), () => {
      this.exchange = this.ExchangeFactory.getExchangeObj();
      return () => this.exchange;
    });
  }

  convertGas(gallonUSD) {
    const gallonCAD = gallonUSD * this.exchange.rateCADtotal;
    this.gallonUSD = gallonUSD;
    this.litreCAD = gallonCAD / 3.78541;
  }

  getGasPrices() {
    this.gasObject = {};
    const { abbr } = this.selectedState;
    this.GasService.getGasPrices(abbr)
      .then((response) => {
        this.gasObject = response;
      });
  }
}

GasCalculatorCtrl.$inject = ['GasService', 'ExchangeFactory', '$scope'];
