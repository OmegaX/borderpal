import angular from 'angular';
import uirouter from 'angular-ui-router';
import formatAsCurrency from 'format-as-currency';

import routes from './gas-calculator-routes';
import GasCalculatorCtrl from './gas-calculator-ctrl';
import GasService from './gas-calculator-service';
import ExchangeCtrl from '../shared-components/exchange-component/exchange-ctrl';
import ExchangeFactory from '../shared-components/exchange-component/exchange-factory';

export default angular.module('borderPalApp.gasCalculator', [uirouter, formatAsCurrency])
  .config(routes)
  .controller('GasCalculatorCtrl', GasCalculatorCtrl)
  .controller('ExchangeCtrl', ExchangeCtrl)
  .service('GasService', GasService)
  .factory('ExchangeFactory', ExchangeFactory)
  .name;
