const template = require('./cost-estimator.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('cost-estimator', {
      url: '/cost-estimator',
      template,
      controller: 'CostEstimatorCtrl',
      controllerAs: 'costEstimator'
    });
}
