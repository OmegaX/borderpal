const unitsObj = {
  Length: [
    {
      id: 'mm',
      label: 'Millimetres',
      multiplier: 1000,
      precision: 1,
      compare: 'cm'
    },
    {
      id: 'cm',
      label: 'Centimetres',
      multiplier: 100,
      precision: 2,
      compare: 'in'
    },
    {
      id: 'in',
      label: 'Inches',
      multiplier: 39.3701,
      precision: 2,
      compare: 'cm'
    },
    {
      id: 'ft',
      label: 'Feet',
      multiplier: 3.28084,
      precision: 2,
      compare: 'm'
    },
    {
      id: 'yd',
      label: 'Yards',
      multiplier: 1.09361,
      precision: 2,
      compare: 'm'
    },
    {
      id: 'm',
      label: 'Metres',
      multiplier: 1,
      precision: 3,
      compare: 'ft'
    },
    {
      id: 'mi',
      label: 'Miles',
      multiplier: 0.000621371192237,
      precision: 2,
      compare: 'km'
    },
    {
      id: 'km',
      label: 'Kilometres',
      multiplier: 0.001,
      precision: 3,
      compare: 'mi'
    }
  ],
  Weight: [
    {
      id: 'mg',
      label: 'Milligrams',
      multiplier: 1000,
      precision: 1,
      compare: 'oz'
    },
    {
      id: 'g',
      label: 'Grams',
      multiplier: 1,
      precision: 2,
      compare: 'oz'
    },
    {
      id: 'oz',
      label: 'Ounces',
      multiplier: 0.0352739619,
      precision: 2,
      compare: 'g'
    },
    {
      id: 'lb',
      label: 'Pounds',
      multiplier: 0.00220462262,
      precision: 2,
      compare: 'kg'
    },
    {
      id: 'kg',
      label: 'Kilograms',
      multiplier: 0.001,
      precision: 3,
      ompare: 'lb'
    },
    {
      id: 'st',
      label: 'Short Tons',
      multiplier: 0.00000110231131,
      precision: 4,
      compare: 'kg'
    },
    {
      id: 'mt',
      label: 'Metric Tons',
      multiplier: 0.000001,
      precision: 4,
      compare: 'lb'
    }
  ],
  Volume: [
    {
      id: 'ml',
      label: 'Millilitres',
      multiplier: 1000,
      precision: 1,
      compare: 'oz'
    },
    {
      id: 'tsp',
      label: 'Teaspoons',
      multiplier: 202.88413621,
      precision: 1,
      compare: 'ml'
    },
    {
      id: 'tbsp',
      label: 'Tablespoons',
      multiplier: 67.6280454,
      precision: 1,
      compare: 'ml'
    },
    {
      id: 'oz',
      label: 'Ounces',
      multiplier: 33.8140226,
      precision: 1,
      compare: 'ml'
    },
    {
      id: 'cup',
      label: 'Cups',
      multiplier: 4.2267528377,
      precision: 1,
      compare: 'ml'
    },
    {
      id: 'pt',
      label: 'Pints',
      multiplier: 2.11337642,
      precision: 2,
      compare: 'l'
    },
    {
      id: 'qt',
      label: 'Quarts',
      multiplier: 1.05669,
      precision: 2,
      compare: 'l'
    },
    {
      id: 'gal',
      label: 'Gallons',
      multiplier: 0.264172052358,
      precision: 3,
      compare: 'l'
    },
    {
      id: 'l',
      label: 'Litres',
      multiplier: 1,
      precision: 3,
      compare: 'gal'
    }
  ],
  Speed: [
    {
      id: 'mph',
      label: 'Miles per hour',
      multiplier: 0.621371192237,
      precision: 2,
      compare: 'kp/h'
    },
    {
      id: 'kp/h',
      label: 'Kilometers per hour',
      multiplier: 1,
      precision: 2,
      compare: 'mph'
    },
    {
      id: 'knot',
      label: 'Knot',
      multiplier: 0.539957,
      precision: 2,
      compare: 'kph'
    }
  ],
  Area: [
    {
      id: 'mm2',
      label: 'Square millimetres',
      multiplier: 1000000,
      precision: 1,
      compare: 'cm2'
    },
    {
      id: 'cm2',
      label: 'Square centimetres',
      multiplier: 10000,
      precision: 2,
      compare: 'in2'
    },
    {
      id: 'in2',
      label: 'Square inches',
      multiplier: 1550.00477401,
      precision: 2,
      compare: 'cm2'
    },
    {
      id: 'ft2',
      label: 'Square feet',
      multiplier: 10.7639111056,
      precision: 2,
      compare: 'm2'
    },
    {
      id: 'yd2',
      label: 'Square yards',
      multiplier: 1.1959828321,
      precision: 2,
      compare: 'm2'
    },
    {
      id: 'm2',
      label: 'Square metres',
      multiplier: 1,
      precision: 3,
      compare: 'ft2'
    },
    {
      id: 'km2',
      label: 'Square kilometres',
      multiplier: 0.000001,
      precision: 4,
      compare: 'mi2'
    },
    {
      id: 'mi2',
      label: 'Square miles',
      multiplier: 0.0000003861021585,
      precision: 2,
      compare: 'km2'
    },
    {
      id: 'acres',
      label: 'Acres',
      multiplier: 0.000247105,
      precision: 4,
      compare: 'm2'
    },
    {
      id: 'hectares',
      label: 'Hectares',
      multiplier: '.0004',
      precision: 4,
      compare: 'km2'
    }
  ],
  Temperature: [
    {
      id: 'F',
      label: 'Fahrenheit',
      compare: 'C'
    },
    {
      id: 'C',
      label: 'Celsius',
      compare: 'F'
    }
  ],
  Currency: [
    {
      id: 'USD',
      label: 'US dollar (USD)',
      multiplier: null,
      precision: 2,
      compare: 'CAD'
    },
    {
      id: 'CAD',
      label: 'Canadian dollar (CAD)',
      multiplier: 1,
      precision: 2,
      compare: 'USD'
    },
    {
      id: 'EUR',
      label: 'Euro (EUR)',
      multiplier: null,
      precision: 2,
      compare: 'CAD'
    },
    {
      id: 'GBP',
      label: 'British Pound (GBP)',
      multiplier: null,
      precision: 2,
      compare: 'CAD'
    },
    {
      id: 'CNY',
      label: 'Chinese Yuan (CNY)',
      multiplier: null,
      precision: 2,
      compare: 'CAD'
    }
  ]
};

export default unitsObj;
