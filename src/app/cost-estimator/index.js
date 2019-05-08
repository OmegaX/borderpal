import angular from 'angular';
// import formatAsCurrency from 'format-as-currency';
import accordion from 'ui-bootstrap4/src/accordion';
import routes from './cost-estimator-routes';
import exchangeComponent from '../shared-components/exchange-component';
import CostEstimatorCtrl from './cost-estimator-ctrl';
import CostEstimatorService from './cost-estimator-service';
import CostEstimatorFactory from './cost-estimator-factory';

require('angular-update-meta');

export default angular.module('borderPalApp.costEstimator', [accordion, exchangeComponent, 'updateMeta'])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl)
  .service('CostEstimatorService', CostEstimatorService)
  .factory('CostEstimatorFactory', CostEstimatorFactory)
  .name;
