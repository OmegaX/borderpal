import { $ } from 'moneysafe';
import { $$, addPercent } from 'moneysafe/ledger';
import Utilities from '../../shared-functions/utility-functions';

export default class PriceConverterCtrl {
  constructor(PriceConverterService, ExchangeService, $scope, $state) {
    this.priceConverterService = PriceConverterService;
    this.exchangeService = ExchangeService;
    this.scope = $scope;
    this.state = $state;
    this.init();
  }

  init() {
    this.inputVal = 0;
    this.outputVal = 0;
    this.appState = 'gas';
    this.priceConverterService.setState('gas');
    this.converterObj = this.priceConverterService.getConverterObj();
    this.inputVal = this.converterObj.gas.inputValue;
    this.chosenObj = {};
    this.exchange = {};

    // update price when exchange rate first loaded or is changed
    this.scope.$watchCollection(() => this.exchangeService.getExchangeObj(), (response) => {
      this.exchange = response;
        this.convert();
    });

    // update price when exchange rate first loaded or is changed
    this.scope.$watchCollection(() =>
      this.priceConverterService.getConverterObj(), () => {
      this.convert();
    });

    // update price when exchange rate first loaded or is changed
    this.scope.$watchCollection(() =>
      this.priceConverterService.getState(), (response) => {
      this.appState = response;
      if (this.appState === 'gas' || this.appState === 'groceries') {
        this.inputVal = this.converterObj[this.appState].inputValue;
        this.convert();
      }
    });
  }

  // update() {
  //   this.chosenObj = this.converterObj[this.appState];
  //   this.inputVal = this.chosenObj.inputValue;
  //   this.convert();
  // }

  convert() {
    // console.log(this.converterObj[state].inputValue);

    if (typeof this.exchange.rateCAD !== 'undefined') {
      this.converterObj[this.appState].inputValue = this.inputVal;

      const inputValue = this.inputVal;
      const exchangeRate = (this.exchange.rateCAD - 1) * 100;
      const exchangeFee = this.exchange.fee;

      const exchangedInput = $$(
        $(inputValue),
        addPercent(exchangeRate)
      ).$;

      const exchangedTotalInput = $$(
        $(exchangedInput),
        addPercent(exchangeFee)
      ).$;

      this.outputVal = $(exchangedTotalInput) / $(this.converterObj[this.appState].divisor);
    }
  }
}

PriceConverterCtrl.$inject = ['PriceConverterService', 'ExchangeService', '$scope', '$state'];
