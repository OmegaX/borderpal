import angular from 'angular';
import routes from './converter-routes';
import ConverterCtrl from './converter-ctrl';
import getUnits from './converter-factory';
import priceConverter from '../shared-components/price-converter-component';
import exchangeComponent from '../shared-components/exchange-component';

export default angular.module('borderPalApp.converter', [priceConverter, exchangeComponent])
  .config(routes)
  .controller('ConverterCtrl', ConverterCtrl)
  .factory('getUnits', getUnits)
  .name;
