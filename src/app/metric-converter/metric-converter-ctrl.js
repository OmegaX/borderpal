export default class ConverterController {

  constructor(ConverterService) {
    this.unitsObj = ConverterService.getUnits();
    // this.leftValue = null;
    // this.rightValue = null;
    // this.unitOptions = [];    

    this.init();
  }

  init() {

    this.clean();    

    this.typeOptions = [];
    this.unitOptions = this.unitsObj.Length; 
    this.selectedLeftUnit = this.unitOptions[6]; // kilometers
    this.selectedRightUnit = this.unitOptions[7]; // miles

    this.typeOptions = this.getTypeOptions(this.unitsObj);
    
    this.selectedType = this.typeOptions[0];
  }
   
  clean() {
    this.leftValue = null;
    this.rightValue = null;
    this.unitOptions = [];  
  }

  getTypeOptions(unitsObj) {
    let i = 0;
    let typeOptions = [];
    for (let p in unitsObj) {
      if( unitsObj.hasOwnProperty(p) ) {
        typeOptions[i] = {label: p};
        i += 1;
      } 
    }
    return typeOptions;
  }

  // when page loads or ng-change typeSelector changes
  typeChange() {

    this.clean(); 

    let selectedType = this.selectedType.label;  
    
    this.unitOptions = this.unitsObj[selectedType].map(function(unit) {
      return unit;
    });

    let defaultLeftUnit, defaultRightUnit;

    switch(selectedType) {
      case "Length":
        defaultLeftUnit = this.unitOptions[1]; // centimetres
        defaultRightUnit = this.unitOptions[2]; // inches
        break;
      case "Volume":
        defaultLeftUnit = this.unitOptions[7]; // litres
        defaultRightUnit = this.unitOptions[8]; // gallons
        break;
      case "Weight":
        defaultLeftUnit = this.unitOptions[4]; // kilograms
        defaultRightUnit = this.unitOptions[3]; // pounds  
        break;   
      default:
        defaultLeftUnit = this.unitOptions[0]; // celcius
        defaultRightUnit = this.unitOptions[1]; // fahrenheit    
        break;       
    }

    this.selectedLeftUnit = defaultLeftUnit;
    this.selectedRightUnit = defaultRightUnit;  

  };

  // when one of the two unit dropdowns changes
  unitChange(direction) {
    if (this.selectedLeftUnit === this.selectedRightUnit) { // when one is changed to the same, change the other
      if (direction === 'leftValue') {
        const newUnitObj = this.unitOptions.find(x => x.id === this.selectedLeftUnit.compare); // choose a commonly compared unit for user convenience
        this.selectedRightUnit = newUnitObj;        
      } else {
        const newUnitObj = this.unitOptions.find(x => x.id === this.selectedRightUnit.compare); // choose a commonly compared unit for user convenience
        this.selectedLeftUnit = newUnitObj;
      }        
    }  
    this.calculate(direction);  // recalculate applicable value    
  };

  // rounding function accepts a value to round and a precision
  round(number = 0, precision = 1) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  // convert temperatures C to F or F to C
  convertTemp(unit = null, temp = null) {
    if (unit === "Celsius") { // convert celcius to fahrenheit
      return (temp * (9 / 5)) + 32;
    } else { // convert fahrenheit to celcius
      return (temp - 32) * (5 / 9);
    } 
  }

  // calculate any value entered in one of the two inputs
  calculate(direction) {

    let inputUnit, inputValue, outputUnit, outputValue;
    let unitOptions = this.unitOptions;
    let selectedType = this.selectedType.label;

    if (direction === "leftValue") {
      inputUnit = this.selectedLeftUnit.label;
      inputValue = this.leftValue;
      outputUnit = this.selectedRightUnit.label;      
    } else {
      inputUnit = this.selectedRightUnit.label;
      inputValue = this.rightValue;
      outputUnit = this.selectedLeftUnit.label;      
    }

    if (selectedType === "Temperature") {      
      outputValue = this.round(this.convertTemp(inputUnit, inputValue), 1);
    } else { // any measurement type other than temperature
      for (let i = 0; i < unitOptions.length; i += 1) { // refactor this if/for mess
        if (inputUnit === unitOptions[i].label) {
          for (let b = 0; b < unitOptions.length; b += 1) {
            if (outputUnit === unitOptions[b].label) {
              let tempValue = (inputValue / unitOptions[i].multiplier) * unitOptions[b].multiplier;
              outputValue = this.round(tempValue, unitOptions[b].precision);
            }
          }
        }
      }
    }

    outputValue = (outputValue === 0) ? null : outputValue; // null defaults to 0 placeholder
    
    if (direction === "leftValue") {
      this.rightValue = outputValue;
    } else {
      this.leftValue = outputValue;
    }

  };

}

ConverterController.$inject = ['ConverterService'];