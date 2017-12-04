export default class CostEstimatorCtrl {
  constructor(EstimatorService, ExchangeService) {
    this.EstimatorService = EstimatorService;
    this.ExchangeService = ExchangeService;

    this.init();
  }

  init() {
    this.dutyCategories = this.EstimatorService.getDutyCategories();
    this.provincialTaxes = this.EstimatorService.getProvincialTaxes();
    this.tripExemptions = this.EstimatorService.getTripExemptions();
    this.popoverText = this.EstimatorService.getPopoverText();

    this.clean();
    this.getExchangeRate();

  }

  clean() {
    this.show = {};

    this.taxUS = { rate: 0, region: 'Search for tax rate by zipcode, or enter it manually.' };
    this.subtotal = {};
    this.grandTotal = {};

    this.itemsArray = [];
    [, this.provincialTax] = this.provincialTaxes;
    [this.tripExemption] = this.tripExemptions;

    // add first item
    this.itemCounter = 1;
    this.addItem();

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

  reset() {
    this.clean();
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

  getUStaxRate() {
    const { zipCode } = this.taxUS;
    this.EstimatorService.getUSTaxRates(zipCode)
      .then((response) => {
        this.taxUS = {
          ...this.taxUS,
          rate: this.EstimatorService.round((response.EstimatedCombinedRate * 100), 3),
          region: `${response.TaxRegionName}, ${response.State}`,
        };
      }, () => {
        this.taxUS = {
          ...this.taxUS,
          region: 'Sorry, zipcode not found. The tax rate remains unchanged.',
        };
      });
  }

  onBlurUStaxField() {
    const taxRateUS = parseFloat(this.taxUS.rate);
    if (Number.isNaN(taxRateUS)) {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered an invalid tax rate. It has defaulted to 0.',
        zipCode: null,
        rate: 0,
      };
    } else {
      this.taxUS = {
        ...this.taxUS,
        region: 'You entered a custom tax rate',
        zipCode: null,
      };
    }
  }

  createItem() {
    const [dutyCategory] = this.dutyCategories;
    return {
      number: this.itemCounter,
      desc: null,
      priceUSD: null,
      taxableUS: true,
      taxableCDN: true,
      dutyCategory,
    };
  }

  addItem() {
    const nextItemNumber = this.itemCounter;
    const itemObject = this.createItem(nextItemNumber);
    this.itemsArray.push(itemObject);
    this.itemCounter += 1;
  }

  removeItem(thisItemNumber) {
    const thisItemIndex = thisItemNumber - 1;
    this.itemsArray[thisItemIndex] = {};
    this.itemsArray.splice(thisItemIndex, 1);
    this.itemCounter -= 1;

    this.itemsArray.map((itemObject, index) => {
      const item = itemObject;
      item.number = index + 1;
      return item;
    });
  }

  calculate() {
    const taxRateCDN = this.provincialTax.combinedRate / 100;
    const taxRateUS = this.taxUS.rate / 100;
    const exchangeFee = this.exchange.exchangeFee / 100;

    let remainingExemption = this.tripExemption.exemption;

    let subtotalDeclarable = 0;
    let subtotalTaxable = 0;
    let subtotalTax = 0;
    let subtotalDuty = 0;
    let subtotalExchangeFee = 0;

    let grandTotalUSD = 0;
    let grandTotalCustomsCAD = 0;
    let grandTotalCAD = 0;

    let showTotals = false;
    let showDutyCol = false;
    let showDescCol = false;
    let showNote1 = false;
    let showNote2 = false;
    let showNote3 = false;

    this.itemsArray.map((itemObject) => {
      const item = itemObject;
      const priceUSD = parseFloat(item.priceUSD);

      item.priceUSD = (Number.isNaN(priceUSD)) ? 0 : priceUSD;

      item.taxUSD = (item.taxableUS) ? (item.priceUSD * taxRateUS) : 0;

      item.subtotalUSD = item.priceUSD + item.taxUSD;

      // CAD calculations
      item.declarableValueCAD = item.subtotalUSD * this.exchange.rateCAD;

      item.exchangeFeeCAD = item.declarableValueCAD * exchangeFee;

      if (this.tripExemption.id !== 'same-day') {
        if (item.taxableCDN) {
          item.taxableValueCAD = item.declarableValueCAD - remainingExemption;
          if (item.taxableValueCAD < 0) {
            remainingExemption = Math.abs(item.taxableValueCAD);
            item.taxableValueCAD = 0;
            item.exemptValueCAD = item.declarableValueCAD;
            showNote1 = true;
            item.asterik = '*';
          } else {
            item.exemptValueCAD = remainingExemption;
            remainingExemption = 0;
            if (item.taxableValueCAD < item.declarableValueCAD) {
              showNote2 = true;
              item.asterik = '**';
            }
          }
        } else { // not taxable anyway
          item.exemptValueCAD = item.declarableValueCAD;
          item.taxableValueCAD = 0;
          showNote3 = true;
          item.asterik = '***';
        }
      } else if (item.taxableCDN) {
        item.exemptValueCAD = 0;
        item.taxableValueCAD = item.declarableValueCAD;
      } else {
        item.exemptValueCAD = item.declarableValueCAD;
        item.taxableValueCAD = 0;
        showNote3 = true;
        item.asterik = '***';
      }

      item.taxCAD = (item.taxableCDN ? (item.taxableValueCAD * taxRateCDN) : 0);

      item.dutyCAD = item.taxableValueCAD * item.dutyCategory.dutyRate;

      item.subtotalCAD = item.declarableValueCAD + item.taxCAD + item.dutyCAD + item.exchangeFeeCAD;

      item.subtotalCustomsCAD = item.taxCAD + item.dutyCAD;

      // total accumulations
      subtotalDeclarable += item.declarableValueCAD;
      subtotalTaxable += item.taxableValueCAD;
      subtotalTax += item.taxCAD;
      subtotalDuty += item.dutyCAD;
      subtotalExchangeFee += item.exchangeFeeCAD;

      grandTotalUSD += item.subtotalUSD;
      grandTotalCustomsCAD += item.subtotalCustomsCAD;
      grandTotalCAD += item.subtotalCAD;

      if (item.number > 1) {
        showTotals = true;
      }

      if (item.dutyCategory.dutyRate > 0) {
        showDutyCol = true;
      }

      if (item.desc !== null && item.desc !== '') {
        showDescCol = true;
      }

      return item;
    }); // end of array map

    this.show = {
      results: true,
      totals: showTotals,
      dutyCol: showDutyCol,
      descCol: showDescCol,
      note1: showNote1,
      note2: showNote2,
      note3: showNote3
    };

    this.subtotal = {
      ...this.subtotal,
      declarable: subtotalDeclarable,
      taxable: subtotalTaxable,
      tax: subtotalTax,
      duty: subtotalDuty,
      exchangeFee: subtotalExchangeFee
    };

    this.grandTotal = {
      US: (grandTotalUSD * this.exchange.rateCADtotal),
      customs: grandTotalCustomsCAD,
      everything: grandTotalCAD
    };
  } // end of calculate function
} // end of controller


