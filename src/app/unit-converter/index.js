import angular from 'angular';
import routes from './unit-converter-routes';
import ConverterCtrl from './unit-converter-ctrl';
import Utilities from '../shared-functions/utility-functions';

export default angular.module('borderPalApp.unitConverter', [])
  .config(routes)
  .controller('ConverterCtrl', ConverterCtrl)
  .factory('Utilities', Utilities)
  .name;
