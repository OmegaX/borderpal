import { $ } from 'moneysafe';
import { $$, percent, addPercent } from 'moneysafe/ledger';
import Utilities from '../shared-functions/utility-functions';

export default class CostEstimatorCtrl {
  constructor(
    CostEstimatorService, CostEstimatorFactory, ExchangeService,
    $scope, $state, $stateParams, $window, $location, $anchorScroll
  ) {
    this.costEstimatorService = CostEstimatorService;
    this.costEstimatorFactory = CostEstimatorFactory;
    this.exchangeService = ExchangeService;
    this.scope = $scope;
    this.state = $state;
    this.stateParams = $stateParams;
    this.window = $window;
    this.location = $location;
    this.anchorScroll = $anchorScroll;
    this.init();
  }

  init() {
    this.dutyCategories = this.costEstimatorFactory.getDutyCategories();
    this.provincialTaxes = this.costEstimatorFactory.getProvincialTaxes();
    this.tripExemptions = this.costEstimatorFactory.getTripExemptions();
    this.popoverText = this.costEstimatorFactory.getPopoverText();

    this.scope.$watchCollection(() => this.exchangeService.getExchangeObj(), (response) => {
      this.exchange = Object.create(response);
    });

    this.itemPrototype = {
      number: null,
      desc: '',
      taxableUS: true,
      isTaxableCAN: true,
      dutyCategory: this.dutyCategories[0],
      USDprice: null,
      USDtaxUS: 0,
      USDsubtotal: 0,
      USDexchangeFee: 0,
      USDtotal: 0,
      CADdeclarable: 0,
      CADtaxable: 0,
      CADexempt: 0,
      CADtaxCAN: 0,
      CADduty: 0,
      CADexchangeFee: 0,
      CADsubtotal: 0
    };
    this.clean();
  }

  clean() {
    this.show = {};
    this.taxUS = {
      rate: 0,
      region: 'Search for tax rate by zipcode, or enter it manually.'
    };
    this.subtotal = {};
    this.grandTotal = {};
    this.itemsArray = [];
    this.provincialTax = this.provincialTaxes[1];
    this.provincialTaxrate = this.provincialTax.rate;
    [this.tripExemption] = this.tripExemptions;

    // add first item
    this.itemCounter = 1;
    this.addItem();

    this.accordionStatus = (this.window.innerWidth > 992) ?
      { taxCDNOpen: true, taxUSAOpen: true }
      : { taxCDNOpen: false, taxUSAOpen: false };
  }

  reset() {
    this.clean();
  }

  addCDNcustomTax() {
    this.provincialTaxes.push({
      label: `Custom - ${this.provincialTaxrate}%`,
      rate: this.provincialTaxrate
    });
    this.provincialTax = this.provincialTaxes[this.provincialTaxes.length - 1];
  }

  provSelectChange() {
    this.provincialTaxrate = this.provincialTax.rate;
  }

  getUStaxRate() {
    const { zipCode } = this.taxUS;
    this.costEstimatorService.getUSTaxRates(zipCode)
      .then((response) => {
        this.taxUS = {
          ...this.taxUS,
          rate: response.EstimatedCombinedRate,
          rateLabel: (response.EstimatedCombinedRate * 100),
          region: `${response.TaxRegionName}, ${response.State}`
        };
      }, () => {
        this.taxUS = {
          ...this.taxUS,
          region: 'Sorry, zipcode not found. The tax rate remains unchanged.'
        };
      });
  }

  onBlurUStaxField() {
    const taxRateUS = this.taxUS.rateLabel;
    if (Utilities.isNumeric(taxRateUS)) {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered a custom tax rate',
        zipCode: null,
        rate: taxRateUS
      };
    } else {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered an invalid tax rate. It has defaulted to 0.',
        zipCode: null,
        rate: 0,
        rateLabel: 0
      };
    }
  }

  addItem() {
    const itemObj = Object.create(this.itemPrototype);
    itemObj.number = this.itemCounter;
    this.itemsArray.push(itemObj);
    this.itemCounter += 1;
  }

  removeItem(thisItemNumber = 1) {
    const thisItemIndex = thisItemNumber - 1;
    this.itemsArray[thisItemIndex] = {};
    this.itemsArray.splice(thisItemIndex, 1);
    this.itemCounter -= 1;

    this.itemsArray.map((itemObj, index) => {
      const item = itemObj;
      item.number = index + 1;
      return item;
    });
  }

  getNoteOrder() {
    switch (this.notes.length) {
      case 0:
        return '*';
      case 1:
        return '**';
      case 2:
        return '***';
      default:
        return '';
    }
  }

  calculate() {
    this.location.hash('js-results');
    this.anchorScroll();

    const exchangePercent = (this.exchange.rateCAD - 1) * 100;

    let remainingExemption = this.tripExemption.exemption;

    let CADsubtotalDeclarable = 0;
    let CADsubtotalTaxable = 0;
    let CADsubtotalExempt = 0;
    let CADsubtotalTax = 0;
    let CADsubtotalDuty = 0;
    let CADsubtotalExchangeFee = 0;

    let USDgrandtotal = 0;
    let CADgrandTotalCustoms = 0;
    let CADgrandTotalAll = 0;

    this.show = {
      totalsCAN: false,
      resultsCAN: true,
      totalsUS: false,
      resultsUS: true,
      dutyCol: false,
      descCol: false
    };

    const showNote = {
      one: false,
      two: false,
      three: false
    };

    this.notes = [];

    this.itemsArray.map((itemObj) => {
      const item = itemObj;

      item.USDprice = parseFloat(item.USDprice);

      item.USDprice = (Number.isNaN(item.USDprice) ? 0 : item.USDprice);

      item.USDtaxUS = $$(
        $(item.USDprice),
        percent(this.taxUS.rate)
      ).$;

      item.USDsubtotal = $$(
        $(item.USDprice),
        addPercent(this.taxUS.rate)
      ).$;

      item.USDexchangeFee = $$(
        $(item.USDsubtotal),
        percent(this.exchange.fee)
      ).$;

      item.USDtotal = $$(
        $(item.USDsubtotal),
        addPercent(this.exchange.fee)
      ).$;

      item.CADdeclarable = $$(
        $(item.USDsubtotal),
        addPercent(exchangePercent)
      ).$;

      item.CADexchangeFee = $$(
        $(item.CADdeclarable),
        percent(this.exchange.fee)
      ).$;

      item.asterik = '';

      if (this.tripExemption.id !== 'same-day' && item.isTaxableCAN) { // apply trip exemption to taxable amounts
        item.CADtaxable = $(item.CADdeclarable).subtract($(remainingExemption)).$;
                console.log('taxablesame day');

        if (item.CADtaxable < 0) {
          remainingExemption = Math.abs(item.CADtaxable);
          item.CADtaxable = 0;
          item.CADexempt = item.CADdeclarable;
          if (!showNote.one) {
            showNote.one = true;
            item.asterik = this.getNoteOrder(1);
            this.notes.push(`${item.asterik} trip exemption applied`);
          }
        } else {
          item.CADexempt = remainingExemption;
          remainingExemption = 0;
          if (item.CADtaxable < item.CADdeclarable) {
            if (!showNote.two) {
              showNote.two = true;
              item.asterik = this.getNoteOrder(2);
              this.notes.push(`${item.asterik} remainder of trip exemption applied`);
            }
          }
        }
      } else if (item.isTaxableCAN) { // tax it
        item.CADexempt = 0;
        item.CADtaxable = item.CADdeclarable;
      } else { // non-taxable... don't tax it
        item.CADexempt = item.CADdeclarable;
        item.CADtaxable = 0;
        if (!showNote.three) {
          showNote.three = true;
          item.asterik = this.getNoteOrder(3);
          this.notes.push(`${item.asterik} you marked this item as tax-exempt`);
        }
      }

      if (item.isTaxableCAN && item.CADtaxable > 0) {
        item.CADtaxCAN = $$(
          $(item.CADtaxable),
          percent(this.provincialTax.rate)
        ).$;
        CADsubtotalTax = $$(
          $(CADsubtotalTax),
          $(item.CADtaxCAN)
        ).$;
      } else {
        item.CADtaxCAN = 0;
      }

      item.CADduty = (item.dutyCategory.rate > 0 ?
        ($$($(item.CADtaxable), percent(item.dutyCategory.rate)).$) : 0);

      item.CADsubtotal = $$(
        $(item.CADdeclarable),
        $(item.CADtaxCAN),
        $(item.CADduty),
        $(item.CADexchangeFee)
      ).$;

      item.subtotalCustomsCAD = $$(
        $(item.CADtaxCAN),
        $(item.CADduty)
      ).$;

      // total accumulations
      CADsubtotalDeclarable = $$(
        $(CADsubtotalDeclarable),
        $(item.CADdeclarable)
      ).$;

      CADsubtotalTaxable = $$(
        $(CADsubtotalTaxable),
        $(item.CADtaxable)
      ).$;

      CADsubtotalExempt = $$(
        $(CADsubtotalExempt),
        $(item.CADexempt)
      ).$;

      if (item.CADduty > 0) {
        CADsubtotalDuty = $$(
          $(CADsubtotalDuty),
          $(item.CADduty)
        ).$;
      }

      CADsubtotalExchangeFee = $$(
        $(CADsubtotalExchangeFee),
        $(item.CADexchangeFee)
      ).$;

      USDgrandtotal = $$(
        $(USDgrandtotal),
        $(item.USDsubtotal)
      ).$;

      CADgrandTotalCustoms = $$(
        $(CADgrandTotalCustoms),
        $(item.subtotalCustomsCAD)
      ).$;

      CADgrandTotalAll = $$(
        $(CADgrandTotalAll),
        $(item.CADsubtotal)
      ).$;

      // this.show.totalsCAN = item.number > 1; // only show totals if more than one row
      // this.show.totalsUS = true; // temp
      if (item.dutyCategory.category !== 0) {
        this.show.dutyCol = true;
      }
      if (item.desc !== '') {
        this.show.descCol = true;
      }

      return item;
    }); // end of array map

    this.CADsubtotal = {
      declarable: CADsubtotalDeclarable,
      taxable: CADsubtotalTaxable,
      exempt: CADsubtotalExempt,
      tax: CADsubtotalTax,
      duty: CADsubtotalDuty,
      exchangeFee: CADsubtotalExchangeFee
    };

    const stateside = $$(
      $(USDgrandtotal),
      addPercent(this.exchange.rateCANtotal)
    ).$;

    this.CADgrandTotal = {
      stateside,
      customs: CADgrandTotalCustoms,
      all: CADgrandTotalAll
    };
  } // end of calculate function
} // end of controller

CostEstimatorCtrl.$inject = ['CostEstimatorService', 'CostEstimatorFactory', 'ExchangeService', '$scope', '$state', '$stateParams', '$window', '$location', '$anchorScroll'];
