import formatAsCurrency from 'format-as-currency';
import routes from './cost-estimator-routes.js';
import CostEstimatorCtrl from './cost-estimator-ctrl.js';
import EstimatorService from './cost-estimator-service.js';
//import estimatorDirective from './cost-estimator-directive.js';

export default angular.module('borderPalApp.costEstimator', [formatAsCurrency])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl)
  .service('EstimatorService', EstimatorService)
 //.directive('estimatorDirective', () => new estimatorDirective)
  .name;
