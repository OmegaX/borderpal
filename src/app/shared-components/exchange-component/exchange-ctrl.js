import { $ } from 'moneysafe';
import { $$, addPercent } from 'moneysafe/ledger';

export default class ExchangeCtrl {
  constructor(ExchangeService) {
    this.exchangeService = ExchangeService;
    this.init();
  }

  init() {
    this.getExchangeRate();
    this.popoverText = 'Most banks charge a fee for converting currency. Typically it\'s 2.5%.';
  }

  getExchangeRate() {
    this.exchangeService.callExchangeAPI()
      .then(() => {
        this.exchange = this.exchangeService.getExchangeObj();
        this.getRateCADtotal();
      });
  }

  getRateCADtotal() {
    const rateCADtotal = $$(
      $(this.exchange.rateCAD),
      addPercent(this.exchange.fee)
    ).$;

    this.exchangeService.setExchangeObj({ rateCADtotal });
    this.exchange = {
      ...this.exchange,
      rateCADtotal
    };
  }

  exchangeFeeChanged() {
    const { fee } = this.exchange;
    this.exchangeService.setExchangeObj({ fee });
    this.getRateCADtotal();
  }
}

ExchangeCtrl.$inject = ['ExchangeService'];
