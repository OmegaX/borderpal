import angular from 'angular';
import uirouter from 'angular-ui-router';
import routes from './gas-finder-routes';
import GasFinderCtrl from './gas-finder-ctrl';
import GasFinderService from './gas-finder-service';
import priceConverter from '../shared-components/price-converter-component';
import exchangeComponent from '../shared-components/exchange-component';

export default angular.module('borderPalApp.gasFinder', [uirouter, priceConverter, exchangeComponent])
  .config(routes)
  .controller('GasFinderCtrl', GasFinderCtrl)
  .service('GasFinderService', GasFinderService)
  .name;
