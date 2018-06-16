import angular from 'angular';
import formatAsCurrency from 'format-as-currency';
import routes from './cost-estimator-routes';
import CostEstimatorCtrl from './cost-estimator-ctrl';
import EstimatorService from './cost-estimator-service';
import accordion from 'ui-bootstrap4/src/accordion';

require('angular-update-meta');

export default angular.module('borderPalApp.costEstimator', [formatAsCurrency, 'updateMeta', accordion])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl)
  .service('EstimatorService', EstimatorService)
  .name;
