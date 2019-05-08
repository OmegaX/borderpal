import { $ } from 'moneysafe';
import { $$, addPercent } from 'moneysafe/ledger';
import moment from 'moment-es6';

export default class ExchangeCtrl {
  constructor(ExchangeService, $window) {
    this.exchangeService = ExchangeService;
    this.window = $window;
    this.init();
  }

  init() {
    this.getExchangeRate();
    this.timeStamp = moment().format('ddd, MMM DD YYYY, h:mm a');

    this.popoverText = 'Most banks charge a fee for converting currency. Typically it\'s 2.5%.';

    this.accordionOpen = (this.window.innerWidth > 992);
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

    // update for the other controllers watching exchangeService
    this.exchangeService.setExchangeObj({ rateCADtotal });

    // update for this controller
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

ExchangeCtrl.$inject = ['ExchangeService', '$window'];
