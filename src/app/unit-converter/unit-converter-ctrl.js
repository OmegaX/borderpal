export default class ConverterCtrl {
  constructor(ExchangeService, Utilities, $scope, $state, $stateParams) {
    this.ExchangeService = ExchangeService;
    this.Utilities = Utilities;
    this.scope = $scope;
    this.state = $state;
    this.stateParams = $stateParams;
    this.init();
  }

  init() {
    this.poundUSD = 5;
    this.gallonUSD = 3;
    this.unitsObj = this.Utilities.getUnits();
    this.unitOptions = this.unitsObj.Length;
    [,,,,,, this.selectedLeftUnit, this.selectedRightUnit] = this.unitOptions;
    this.typeOptions = Object.keys(this.unitsObj);
    [this.selectedType] = this.typeOptions;

    this.scope.$watchCollection(() => this.ExchangeService.getExchangeObj(), () => {
      this.exchange = this.ExchangeService.getExchangeObj();
      this.convertGas();
      this.convertGroceries();
      return () => this.exchange;
    });
  }

  clean() {
    this.leftValue = null;
    this.rightValue = null;
    this.explanation = null;
  }

  convertGas() {
    const gallonCAD = this.gallonUSD * this.exchange.rateCADtotal;
    this.litreCAD = gallonCAD / 3.78541;
  }

  convertGroceries(poundUSD = this.poundUSD) {
    this.poundUSD = poundUSD;
    const poundCAD = poundUSD * this.exchange.rateCADtotal;
    this.kiloCAD = poundCAD * 2.2;
  }

  getExchangeRate() {
    this.ExchangeService.callExchangeAPI()
      .then((response) => {
        this.unitsObj.Currency[0].multiplier = response.rateUSD;
        this.unitsObj.Currency[1].multiplier = 1;
        this.unitsObj.Currency[2].multiplier = response.rateEUR;
        this.unitsObj.Currency[3].multiplier = response.rateGBP;
        this.unitsObj.Currency[4].multiplier = response.rateCNY;
      });
  }

  // when page loads or ng-change typeSelector changes
  typeChange(selectedType = this.selectedType) {
    this.clean();

    let defaultLeftUnit;
    let defaultRightUnit;

    this.unitOptions = this.unitsObj[selectedType].map(unit => unit);
    this.selectedType = selectedType;

    switch (selectedType) {
      case 'Length':
        [,,,,,, defaultLeftUnit, defaultRightUnit] = this.unitOptions; // ft to m
        break;
      case 'Volume':
        [,,,,,,, defaultLeftUnit, defaultRightUnit] = this.unitOptions; // gal to l
        break;
      case 'Weight':
        [,,, defaultLeftUnit, defaultRightUnit] = this.unitOptions; // lb to kg
        break;
      case 'Area':
        [,,, defaultLeftUnit,, defaultRightUnit] = this.unitOptions; // lb to kg
        break;
      case 'Speed':
        [defaultLeftUnit, defaultRightUnit] = this.unitOptions; // lb to kg
        break;
      case 'Currency':
        this.getExchangeRate();
        [defaultLeftUnit, defaultRightUnit] = this.unitOptions; // USD to CAD
        break;
      default:
        [defaultLeftUnit, defaultRightUnit] = this.unitOptions; // F to C
        break;
    }

    this.selectedLeftUnit = defaultLeftUnit;
    this.selectedRightUnit = defaultRightUnit;
  }

  // when one of the two unit dropdowns changes
  unitChange(direction) {
    let newUnitObj;
    // when one is changed to the same as the other, change the other
    if (this.selectedLeftUnit === this.selectedRightUnit) {
      // choose a commonly compared unit for user convenience
      if (direction === 'left') {
        newUnitObj = this.unitOptions.find(x => x.id === this.selectedLeftUnit.compare);
        this.selectedRightUnit = newUnitObj;
      } else {
        newUnitObj = this.unitOptions.find(x => x.id === this.selectedRightUnit.compare);
        this.selectedLeftUnit = newUnitObj;
      }
    }
    // recalculate applicable value
    this.calculate(direction);
  }

  // calculate any value entered in one of the two inputs
  calculate(direction) {
    let inputUnit;
    let inputValue;
    let outputUnit;
    let outputValue;

    if (direction === 'left') {
      inputUnit = this.selectedLeftUnit.id;
      inputValue = this.leftValue;
      outputUnit = this.selectedRightUnit.id;
    } else {
      inputUnit = this.selectedRightUnit.id;
      inputValue = this.rightValue;
      outputUnit = this.selectedLeftUnit.id;
    }

    if (this.selectedType === 'Temperature') {
      outputValue = this.Utilities.convertTemp(inputUnit, inputValue);
      outputValue = this.Utilities.round(outputValue, 1);
    } else {
      const [inputObj] = this.unitOptions.filter(unitIn => unitIn.id === inputUnit);
      const [outputObj] = this.unitOptions.filter(unitOut => unitOut.id === outputUnit);
      let tempValue = (inputValue / inputObj.multiplier);
      tempValue *= outputObj.multiplier;
      outputValue = this.Utilities.round(tempValue, outputObj.precision);
    }

    // null defaults to 0 placeholder
    outputValue = (outputValue === 0) ? null : outputValue;

    if (direction === 'left') {
      this.rightValue = outputValue;
    } else {
      this.leftValue = outputValue;
    }

    if (this.leftValue && this.rightValue) {
      this.explanation = `${this.leftValue} ${this.selectedLeftUnit.id} is ${this.rightValue} ${this.selectedRightUnit.id}`;
    }
  }
}

ConverterCtrl.$inject = ['ExchangeService', 'Utilities', '$scope', '$state', '$stateParams'];
