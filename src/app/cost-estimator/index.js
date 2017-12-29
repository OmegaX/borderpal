import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './cost-estimator-routes';
import CostEstimatorCtrl from './cost-estimator-ctrl';
import EstimatorService from './cost-estimator-service';
import ExchangeCtrl from '../shared-components/exchange-component/exchange-ctrl';
import ExchangeFactory from '../shared-components/exchange-component/exchange-factory';

export default angular.module('borderPalApp.costEstimator', [uirouter])
  .config(routes)
  .controller('CostEstimatorCtrl', CostEstimatorCtrl)
  .controller('ExchangeCtrl', ExchangeCtrl)
  .service('EstimatorService', EstimatorService)
  .factory('ExchangeFactory', ExchangeFactory)
  .name;

