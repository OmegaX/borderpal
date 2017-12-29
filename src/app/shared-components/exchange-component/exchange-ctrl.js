export default class ExchangeCtrl {
  constructor(ExchangeFactory) {
    this.ExchangeFactory = ExchangeFactory;
    this.init();
  }

  init() {
    this.getExchangeRate();
    if (window.innerWidth > 992) this.accordionOpen = true;
  }

  getExchangeRate() {
    this.ExchangeFactory.callExchangeAPI()
      .then(() => {
        this.exchange = this.ExchangeFactory.getExchangeObj();
        this.getRateCADtotal();
      });
  }

  getRateCADtotal() {
    const rateCAD = 1 / this.exchange.rateUSD;
    const rateCADtotal = rateCAD * (1 + (this.exchange.fee / 100));
    this.ExchangeFactory.setExchangeObj({ rateCAD, rateCADtotal });
    this.exchange = this.ExchangeFactory.getExchangeObj();
  }

  exchangeFeeChanged() {
    const { fee } = this.exchange;
    this.ExchangeFactory.setExchangeObj({ fee });
    this.getRateCADtotal();
  }
}
