const template = require('./cost-estimator.html');
const exchangePartial = require('../shared-partials/exchange-component.html');

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
          controller: 'CostEstimatorCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    });
}
