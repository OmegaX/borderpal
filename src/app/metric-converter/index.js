import routes from './metric-converter-routes.js';
import MetricConverterCtrl from './metric-converter-ctrl.js';
import ConverterService from './metric-converter-service.js';

export default angular.module('borderPalApp.metricConverter', [])
  .config(routes)
  .controller('MetricConverterCtrl', MetricConverterCtrl)  
  .service('ConverterService', ConverterService)
  .name;
