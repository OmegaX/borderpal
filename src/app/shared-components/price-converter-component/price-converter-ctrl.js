import { $ } from 'moneysafe';
import { $$, addPercent } from 'moneysafe/ledger';

export default class PriceConverterCtrl {
  constructor(PriceConverterService, ExchangeService, $scope) {
    this.priceConverterService = PriceConverterService;
    this.exchangeService = ExchangeService;
    this.scope = $scope;
    this.init();
  }

  init() {
    this.converterObj = this.priceConverterService.getConverterObj();

    // update price when exchange rate first loaded or is changed
    this.scope.$watchCollection(() => this.exchangeService.getExchangeObj(), (response) => {
      this.exchange = response;
      this.convert();
    });

    // update price when page first loaded or input value changes
    this.scope.$watchCollection(() => this.priceConverterService.getConverterObj(), (response) => {
      this.converterObj = response;
      this.convert();
    });
  }

  convert(inputValue = this.converterObj.inputValue) {
    const exchangeRate = (this.exchange.rateCAD - 1) * 100;
    const exchangeFee = this.exchange.fee;

    this.inputValue = (Number.isNaN(inputValue) ? 0 : inputValue);

    const exchangedInput = $$(
      $(this.inputValue),
      addPercent(exchangeRate)
    ).$;

    const exchangedTotalInput = $$(
      $(exchangedInput),
      addPercent(exchangeFee)
    ).$;

    this.outputValue = $(exchangedTotalInput) / $(this.converterObj.divisor);
  }
}

PriceConverterCtrl.$inject = ['PriceConverterService', 'ExchangeService', '$scope'];
