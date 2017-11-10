
import moment from 'moment';

export default class EstimatorController { 

  constructor(EstimatorService) {

    this.EstimatorService = EstimatorService;

    this.init();

  }

  init() {

    // populate dropdowns via service
    this.dutyCategories = this.EstimatorService.getDutyCategories();
    this.provincialTaxes = this.EstimatorService.getProvincialTaxes();
    this.tripExemptions = this.EstimatorService.getTripExemptions();
    this.popoverText = this.EstimatorService.getPopoverText();

    this.clean();
    this.getExchangeRate();
  }

  clean() {

    this.show = {};
    this.exchange = {...this.exchange, rateBank: 2.5};
    this.taxUS = {rate: 0, region: "Search for tax rate by zipcode, or enter it manually."};
    this.subtotal = {};    
    this.grandTotal = {};

    this.itemsArray = [];  
    this.provincialTax = this.provincialTaxes[1];
    this.tripExemption = this.tripExemptions[0];

    // add first item
    this.itemCounter = 1;   
    this.addItem();
  }

  reset() {
    this.clean();
  };

  getExchangeRate() {
    this.EstimatorService.getExchangeRate()
      .then(response => {
        const exchangeUS = parseFloat(response.rates.CAD);
        const exchangeBank = 2.5;
        this.exchange = {
          ...this.exchange,
          date: moment(response.date).format("MMMM DD, YYYY"),
          rateUSD: exchangeUS,
          rateCAD: parseFloat((1 / exchangeUS).toPrecision(4)),
          rateBank: exchangeBank,
          rateCADtotal: parseFloat((exchangeUS * (1 + (exchangeBank / 100))).toPrecision(5))
        }; 
      // }, error => {
      });
  }

  getUStaxRate() {
    const zipCode = this.taxUS.zipCode;
    this.EstimatorService.getUSTaxRates(zipCode)
      .then(response => {
        this.taxUS = {
          ...this.taxUS,
          rate: this.EstimatorService.round((response.EstimatedCombinedRate * 100), 3),
          region: `${response.TaxRegionName}, ${response.State}`          
        };
      }, error => {
        this.taxUS = {
          ...this.taxUS,
          region: `Sorry, zipcode not found. The tax rate remains unchanged.`
        };
      });
  }

  onBlurUStaxField() {
    const taxRateUS = parseFloat(this.taxUS.rate);
    if (isNaN(taxRateUS)) {
      this.taxUS = {
        ...this.taxUS,
        region: "You entered an invalid tax rate. It has defaulted to 0.",
        zipCode: null,
        rate: 0
      };
    } else {
      this.taxUS = {
        ...this.taxUS,
        region: "You entered a custom tax rate",
        zipCode: null
      };
    }
  }

  addItem() {
    const nextItemNumber = this.itemCounter;
    const itemObject = new this.EstimatorService.createItemObject(nextItemNumber, this.dutyCategories[0]);
    this.itemsArray.push(itemObject);
    this.itemCounter += 1;
  }

  removeItem(thisItemNumber) {
    const thisItemIndex = thisItemNumber - 1;
    this.itemsArray[thisItemIndex] = {};
    this.itemsArray.splice(thisItemIndex, 1);
    this.itemCounter -= 1;

    this.itemsArray.map((item, index) => {
      item.number = index + 1;
      return item.number;
    });

  }

  calculate() {

    const taxRateCDN = this.provincialTax.combinedRate / 100;
    const taxRateUS = this.taxUS.rate / 100;
    const bankFeeRate = this.exchange.rateBank / 100;
    
    let remainingExemption = this.tripExemption.exemption;  

    let subtotalDeclarable = 0;
    let subtotalTaxable = 0;
    let subtotalTax = 0;
    let subtotalDuty = 0;
    let subtotalBankFee = 0;

    let grandTotalUSD = 0;
    let grandTotalCustomsCAD = 0;
    let grandTotalCAD = 0;

    let showTotals = false;
    let showDutyCol = false;
    let showDescCol = false;
    let showNote1 = false;
    let showNote2 = false;
    let showNote3 = false;
    let showResults = false;
    
    this.itemsArray.map((item) => {

      const priceUSD = parseFloat(item.priceUSD);

      item.priceUSD = (isNaN(priceUSD)) ? 0 : priceUSD;

      item.taxUSD = (item.taxableUS) ? (item.priceUSD * taxRateUS) : 0;

      item.subtotalUSD = item.priceUSD + item.taxUSD;

      // CAD calculations
      item.declarableValueCAD = item.subtotalUSD * this.exchange.rateUSD;

      item.bankFeeCAD = item.declarableValueCAD * bankFeeRate;

      if (this.tripExemption.id !== "same-day") {

        if (item.taxableCDN) {
        
          item.taxableValueCAD = this.EstimatorService.round((item.declarableValueCAD - remainingExemption), 2);

          if (item.taxableValueCAD < 0) {
            remainingExemption = Math.abs(item.taxableValueCAD);
            item.taxableValueCAD = 0;
            item.exemptValueCAD = item.declarableValueCAD;            
            showNote1 = true;
            item.asterik = `*`;
          } else {        
            item.exemptValueCAD = remainingExemption;         
            remainingExemption = 0;
            showNote2 = true;
            item.asterik = `**`;
          }
        } else { //not taxable anyway
          item.exemptValueCAD = item.declarableValueCAD;
          item.taxableValueCAD = 0;          
          showNote3 = true;
          item.asterik = `***`;   
        }
      } else { //same day trip - no exemption
        if (item.taxableCDN) {
          item.exemptValueCAD = 0;
          item.taxableValueCAD = item.declarableValueCAD; 
        } else {
          item.exemptValueCAD = item.declarableValueCAD;
          item.taxableValueCAD = 0; 
          showNote3 = true;
          item.asterik = `***`;         
        }
      }

      item.taxCAD = (item.taxableCDN ? (item.taxableValueCAD * taxRateCDN) : 0);
  
      // item.subtotalCAD = item.declarableValueCAD + item.taxCAD;

      item.dutyCAD = item.taxableValueCAD * item.dutyCategory.dutyRate;

      item.subtotalCAD = item.declarableValueCAD + item.taxCAD + item.dutyCAD + item.bankFeeCAD;

      item.subtotalCustomsCAD = item.taxCAD + item.dutyCAD;

      // total accumulations

      subtotalDeclarable += item.declarableValueCAD;
      subtotalTaxable += item.taxableValueCAD;
      subtotalTax += item.taxCAD;
      subtotalDuty +=  item.dutyCAD;
      subtotalBankFee += item.bankFeeCAD;

      grandTotalUSD += item.subtotalUSD;
      grandTotalCustomsCAD += item.subtotalCustomsCAD;
      grandTotalCAD += item.subtotalCAD;

      if (item.number > 1) {
        showTotals = true;
      }

      if (item.dutyCategory.dutyRate > 0) {
        showDutyCol = true;
      }

      if (item.desc !== null && item.desc !== "") {
        showDescCol = true;
      }

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
      bankFee: subtotalBankFee
    };

    this.grandTotal = {
      US: (grandTotalUSD * this.exchange.rateCADtotal), 
      customs: grandTotalCustomsCAD, 
      everything: grandTotalCAD
    };

  }; // end of calculate function

} // end of controller
