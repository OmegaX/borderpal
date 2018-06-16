import { $ } from 'moneysafe';
import { $$, percent, addPercent } from 'moneysafe/ledger';

export default class CostEstimatorCtrl {
  constructor(EstimatorService, ExchangeService, $scope) {
    this.EstimatorService = EstimatorService;
    this.ExchangeService = ExchangeService;
    this.scope = $scope;
    this.init();
  }

  init() {
    this.dutyCategories = Object.create(this.EstimatorService.getDutyCategories());
    this.provincialTaxes = Object.create(this.EstimatorService.getProvincialTaxes());
    this.tripExemptions = Object.create(this.EstimatorService.getTripExemptions());
    this.popoverText = Object.create(this.EstimatorService.getPopoverText());
    this.scope.$watchCollection(() => this.ExchangeService.getExchangeObj(), (response) => {
      this.exchange = Object.create(response);
    });
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
    [this.tripExemption] = this.tripExemptions;

    // add first item
    this.itemCounter = 1;
    this.addItem();

    this.accordionStatus = (window.innerWidth > 992) ?
      { taxCDNOpen: true, taxUSAOpen: true } : { taxCDNOpen: false, taxUSAOpen: false };
  }

  reset() {
    this.clean();
  }

  createCDNcustomTaxObj() {
    return {
      label: `Custom - ${this.provincialTax.rate}%`,
      rate: this.provincialTax.rate
    };
  }

  addCDNcustomTax() {
    this.provincialTaxes.push(this.createCDNcustomTaxObj());
    this.provincialTax = this.provincialTaxes[this.provincialTaxes.length - 1];
  }

  getUStaxRate() {
    const { zipCode } = this.taxUS;
    this.EstimatorService.getUSTaxRates(zipCode)
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
    const taxRateUS = parseFloat(this.taxUS.rateLabel);
    if (Number.isNaN(taxRateUS)) {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered an invalid tax rate. It has defaulted to 0.',
        zipCode: null,
        rate: 0,
        rateLabel: 0
      };
    } else {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered a custom tax rate',
        zipCode: null,
        rate: taxRateUS / 100
      };
    }
  }

  createItemObj() {
    return Object.create({
      number: null,
      desc: '',      
      taxableUS: true,
      taxableCAN: true,
      dutyCategory: this.dutyCategories[0],
      USDprice: 0,
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
    });
  }

  addItem() {
    const itemObj = this.createItemObj();
    itemObj.number = this.itemCounter;
    this.itemsArray.push(itemObj);
    this.itemCounter += 1;
    console.log(this.itemsArray);
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
    const exchangePercent = (this.exchange.rateCAD - 1) * 100;

    let remainingExemption = this.tripExemption.exemption;

    let CADsubtotalDeclarable = 0;
    let CADsubtotalTaxable = 0;
    let CADsubtotalTax = 0;
    let CADsubtotalDuty = 0;
    let CADsubtotalExchangeFee = 0;

    let USDgrandTotal = 0;
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

      if (this.tripExemption.id !== 'same-day') { // apply trip exemption to taxable amounts
        if (item.taxableCAN) {
          item.CADtaxable = $(item.CADdeclarable).subtract($(remainingExemption)).$;
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
        } else { // non-taxable anyway
          item.CADexempt = item.CADdeclarable;
          item.CADtaxable = 0;
          if (!showNote.three) {
            showNote.three = true;
            item.asterik = this.getNoteOrder(3);
            this.notes.push(`${item.asterik} you marked this item as tax-exempt`);
          }
        }
      } else if (item.taxableCAN) { // tax it
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

      if (item.taxableCAN && item.CADtaxable > 0) {
        item.CADtaxCAN = $$(
          $(item.CADtaxable), 
          percent(this.provincialTax.rate)
        ).$;
        CADsubtotalTax = $$(
          $(CADsubtotalTax),
          $(item.CADtaxCAN)
        ).$;
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

      USDgrandTotal = $$(
        $(USDgrandTotal),
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

      this.show.totalsCAN = item.number > 1; // only show totals if more than one row
      this.show.totalsUS = true; // temp
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
      tax: CADsubtotalTax,
      duty: CADsubtotalDuty,
      exchangeFee: CADsubtotalExchangeFee
    };

    console.log(this.notes);

    const stateside = $$(
      $(USDgrandTotal),
      addPercent(this.exchange.rateCANtotal)
    ).$;

    this.CADgrandTotal = {
      stateside,
      customs: CADgrandTotalCustoms,
      all: CADgrandTotalAll
    };

    console.log(this.CADgrandTotal);
  } // end of calculate function
} // end of controller

CostEstimatorCtrl.$inject = ['EstimatorService', 'ExchangeService', '$scope'];
