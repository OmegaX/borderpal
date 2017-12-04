export default class GasCalculatorCtrl {
  constructor(GasCalculatorService, ExchangeService) {
    this.GasCalculatorService = GasCalculatorService;
    this.ExchangeService = ExchangeService;
    this.init();
  }

  init() {
    this.resultsShow = false;
    this.getExchangeRate();
    this.getCDNBorderWaits();
    this.statesArray = this.GasCalculatorService.getStates();



    if (window.innerWidth > 992) {
      this.accordionStatus = {
        exchangeOpen: true,
        taxCDNOpen: true,
        taxUSAOpen: true
      };
    } else {
      this.accordionStatus = {
        exchangeOpen: false,
        taxCDNOpen: false,
        taxUSAOpen: false
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
      });
  }

  getTotalCostExchange() {
    this.exchange = {
      ...this.exchange,
      rateCADtotal: this.exchange.rateCAD * (1 + (this.exchange.exchangeFee / 100))
    };
  }


  convertGas(gallonUSD) {
    const gallonCAD = (gallonUSD, exchange) => gallonUSD * exchange;
    const litreCAD = valueCAD => valueCAD / 3.78541;
    this.gallon = gallonUSD;
    this.litreCAD = litreCAD()
      .gallonCAD(gallonUSD, this.exchange.rateCADtotal);
    this.resultsShow = true;
  }

  getGasPrices() {
    this.gasObject = {};
    const { abbr } = this.selectedState;
    this.GasCalculatorService.getGasPrices(abbr)
      .then((response) => {
        this.gasObject = response;
        console.log(this.gasObject);
      });
  }
}
