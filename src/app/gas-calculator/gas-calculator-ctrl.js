export default class GasCalculatorCtrl {
  constructor(GasCalculatorService, ExchangeService) {
    this.GasCalculatorService = GasCalculatorService;
    this.ExchangeService = ExchangeService;
    this.init();
  }

  init() {
    this.getExchangeRate();
    this.statesArray = this.GasCalculatorService.getStates();

    if (window.innerWidth > 992) {
      this.accordionStatus = {
        exchangeOpen: true
      };
    } else {
      this.accordionStatus = {
        exchangeOpen: false
      };
    }
  }

  getExchangeRate() {
    this.ExchangeService.callExchangeAPI()
      .then((response) => {
        this.exchange = {
          ...this.exchange,
          date: response.date,
          exchangeFee: 2.5,
          rateUSD: response.rates.USD,
          rateCAD: 1 / response.rates.USD
        };
        this.getTotalCostExchange();
        this.convertGas(3);
      });
  }

  getTotalCostExchange() {
    this.exchange = {
      ...this.exchange,
      rateCADtotal: this.exchange.rateCAD * (1 + (this.exchange.exchangeFee / 100))
    };
  }

  convertGas(gallonUSD) {
    const gallonCAD = gallonUSD * this.exchange.rateCADtotal;
    this.gallonUSD = gallonUSD;
    this.litreCAD = gallonCAD / 3.78541;
  }

  getGasPrices() {
    this.gasObject = {};
    const { abbr } = this.selectedState;
    this.GasCalculatorService.getGasPrices(abbr)
      .then((response) => {
        this.gasObject = response;
      });
  }
}
