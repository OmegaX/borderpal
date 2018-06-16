import template from './cost-estimator.html';
import exchangePartial from '../shared-components/exchange-component/exchange-component.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('cost-estimator', {
      url: '/cost-estimator',
      views: {
        '': {
          template,
          controller: 'CostEstimatorCtrl',
          controllerAs: 'costEstimator'
        },
        'exchangeView@cost-estimator': {
          template: exchangePartial,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
