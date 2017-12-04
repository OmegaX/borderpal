routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
  .state('unit-converter', {
    url: '/unit-converter',
    template: require('./unit-converter.html'),
	controller: 'UnitConverterCtrl',
	controllerAs: 'unitConverter'
  });
}
