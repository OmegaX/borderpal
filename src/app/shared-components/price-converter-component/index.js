import angular from 'angular';
import uirouter from 'angular-ui-router';
import PriceConverterCtrl from './price-converter-ctrl';
import PriceConverterService from './price-converter-service';

export default angular.module('borderPalApp.priceConverter', [uirouter])
  .controller('PriceConverterCtrl', PriceConverterCtrl)
  .service('PriceConverterService', PriceConverterService)
  .name;
