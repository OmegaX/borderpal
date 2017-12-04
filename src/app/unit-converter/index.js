import angular from 'angular';
import routes from './unit-converter-routes';
import UnitConverterCtrl from './unit-converter-ctrl';
import ConverterService from './unit-converter-service';

export default angular.module('borderPalApp.unitConverter', [])
  .config(routes)
  .controller('UnitConverterCtrl', UnitConverterCtrl)
  .service('ConverterService', ConverterService)
  .name;
