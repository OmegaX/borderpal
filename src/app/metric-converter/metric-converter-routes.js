routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
  .state('metric-converter', {
    url: '/metric-converter',
    template: require('./metric-converter.html'),
	controller: 'MetricConverterCtrl',
	controllerAs: 'metricConverter'
  });
}
