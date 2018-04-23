import angular from 'angular';
import uirouter from 'angular-ui-router';
import routes from './gas-calculator-routes';
import GasCalculatorCtrl from './gas-calculator-ctrl';
import GasService from './gas-calculator-service';

export default angular.module('borderPalApp.gasCalculator', [uirouter])
  .config(routes)
  .controller('GasCalculatorCtrl', GasCalculatorCtrl)
  .service('GasService', GasService)
  .name;
