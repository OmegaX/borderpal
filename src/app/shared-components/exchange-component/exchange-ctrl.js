export default class ExchangeCtrl {
  constructor(ExchangeService) {
    this.ExchangeService = ExchangeService;
    this.init();
  }

  init() {
    this.getExchangeRate();
    this.popoverText = 'Most banks charge a fee for converting currency. Typically it\'s 2.5%.';
    if (window.innerWidth > 992) this.accordionOpen = true;
  }

  getExchangeRate() {
    this.ExchangeService.callExchangeAPI()
      .then(() => {
        this.exchange = this.ExchangeService.getExchangeObj();
        this.getRateCADtotal();
      });
  }

  getRateCADtotal() {
    const rateCADtotal = this.exchange.rateCAD * (1 + (this.exchange.fee / 100));
    this.ExchangeService.setExchangeObj({ rateCADtotal });
    this.exchange = {
      ...this.exchange,
      rateCADtotal
    };
  }

  exchangeFeeChanged() {
    const { fee } = this.exchange;
    this.ExchangeService.setExchangeObj({ fee });
    this.getRateCADtotal();
  }
}

ExchangeCtrl.$inject = ['ExchangeService'];
