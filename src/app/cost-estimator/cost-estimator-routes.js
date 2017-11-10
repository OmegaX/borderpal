routes.$inject = ['$stateProvider', '$locationProvider'];

export default function routes($stateProvider, $locationProvider) {
  $stateProvider
  .state('cost-estimator', {
    url: '/cost-estimator',
    template: require('./cost-estimator.html'),
	controller: 'CostEstimatorCtrl',
	controllerAs: 'costEstimator'
  });
}
