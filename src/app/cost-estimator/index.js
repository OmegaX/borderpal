import angular from 'angular';
import uirouter from 'angular-ui-router';
import formatAsCurrency from 'format-as-currency';

import routes from './cost-estimator-routes.js';
import CostEstimatorCtrl from './cost-estimator-ctrl.js';
import EstimatorService from './cost-estimator-service.js';
//import estimatorDirective from './cost-estimator-directive.js';

export default angular.module('borderPalApp.costEstimator', [uirouter, formatAsCurrency])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl, window)
  .service('EstimatorService', EstimatorService)
 //.directive('estimatorDirective', () => new estimatorDirective)
  .name;
