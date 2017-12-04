import angular from 'angular';
import uirouter from 'angular-ui-router';
import formatAsCurrency from 'format-as-currency';

import routes from './gas-calculator-routes';
import GasCalculatorCtrl from './gas-calculator-ctrl';
import GasCalculatorService from './gas-calculator-service';
// import estimatorDirective from './cost-estimator-directive';

export default angular.module('borderPalApp.gasCalculator', [uirouter, formatAsCurrency])
  .config(routes)
  .controller('GasCalculatorCtrl', GasCalculatorCtrl)
  .service('GasCalculatorService', GasCalculatorService)
 // .directive('estimatorDirective', () => new estimatorDirective)
  .name;

