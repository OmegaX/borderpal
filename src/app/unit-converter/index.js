import angular from 'angular';
import routes from './unit-converter-routes';
import ConverterCtrl from './unit-converter-ctrl';
import ConverterService from './unit-converter-service';
import Utilities from '../shared-services/utility-functions';

export default angular.module('borderPalApp.unitConverter', [])
  .config(routes)
  .controller('ConverterCtrl', ConverterCtrl)
  .service('ConverterService', ConverterService)
  .factory('Utilities', Utilities)
  .name;
