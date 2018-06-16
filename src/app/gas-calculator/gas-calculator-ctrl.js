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
    this.scope.$watchCollection(() => this.ExchangeService.getExchangeObj(), (response) => {
      this.exchange = response;
      this.convertGas();
    });
    this.name = window.sessionStorage.getItem("SavedString");
    console.log(this.name);
  }

  convertGas(gallonUSD = this.gallonUSD) {
    console.log(this.exchange);
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
