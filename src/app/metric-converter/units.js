const unitsObj = {
  "Length": [
    {id: "millimetres", label: "Millimetres", multiplier: "1000", compare: "centimetres"},
    {id: "centimetres", label: "Centimetres", multiplier: "100", compare: "inches"},      
    {id: "inches", label: "Inches", multiplier: "39.3701", compare: "centimetres"},
    {id: "feet", label: "Feet", multiplier: "3.28084", compare: "metres"},
    {id: "yards", label: "Yards", multiplier: "1.09361", compare: "metres"},
    {id: "metres", label: "Metres", multiplier: "1", compare: "feet"},  
    {id: "kilometres", label: "Kilometres", multiplier: ".001", compare: "miles"},
    {id: "miles", label: "Miles", multiplier: "0.000621371192237", compare: "kilometres"},
  ],
  "Weight": [
    {id: "milligrams", label: "Milligrams", multiplier: "1000", compare: "ounces"},
    {id: "grams", label: "Grams", multiplier: "1", compare: "ounces"},
    {id: "ounces", label: "Ounces", multiplier: "0.0352739619", compare: "grams"},
    {id: "pounds", label: "Pounds", multiplier: "0.00220462262", compare: "kilograms"},
    {id: "kilograms", label: "Kilograms", multiplier: "0.001", compare: "pounds"},
    {id: "short-tons", label: "Short Tons", multiplier: "0.00000110231131", compare: "kilograms"},
    {id: "metric-tons", label: "Metric Tons", multiplier: "0.000001", compare: "pounds"},
    {id: "long-tons", label: "Long Tons", multiplier: "0.000000984206528", compare: "kilograms"}        
  ],
  "Volume": [
    {id: "millilitres", label: "Millilitres", multiplier: "1000", compare: "ounces"},
    {id: "teaspoons", label: "Teaspoons", multiplier: "202.88413621", compare: "millilitres"},
    {id: "tablespoons", label: "Tablespoons", multiplier: "67.6280454", compare: "millilitres"},
    {id: "ounces", label: "Ounces", multiplier: "33.8140226", compare: "millilitres"},     
    {id: "cups", label: "Cups", multiplier: "4.2267528377", compare: "millilitres"},
    {id: "pints", label: "Pints", multiplier: "2.11337642", compare: "litres"},   
    {id: "quarts", label: "Quarts", multiplier: "1.05669", compare: "litres"},                 
    {id: "litres", label: "Litres", multiplier: "1", compare: "gallons"},
    {id: "gallons", multiplier: "0.264172052358", compare: "litres"}
  ],
  "Temperature": [
    {id: 'celsius', label: "Celsius", compare: "fahrenheit"},
    {id: 'fahrenheit', label: "Fahrenheit", compare: "celsius"}
  ]
};

export default unitsObj;