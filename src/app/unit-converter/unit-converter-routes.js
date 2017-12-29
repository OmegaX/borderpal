const template = require('./unit-converter.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('unit-converter', {
      url: '/unit-converter',
      template,
      controller: 'ConverterCtrl',
      controllerAs: 'unitConverter'
    });
}

routes.$inject = ['$stateProvider'];
