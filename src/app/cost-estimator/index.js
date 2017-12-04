import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './cost-estimator-routes';
import CostEstimatorCtrl from './cost-estimator-ctrl';
import EstimatorService from './cost-estimator-service';
//import estimatorDirective from './cost-estimator-directive';

export default angular.module('borderPalApp.costEstimator', [uirouter])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl)
  .service('EstimatorService', EstimatorService)

  // .directive('estimatorDirective', () => new estimatorDirective)
  .name;

