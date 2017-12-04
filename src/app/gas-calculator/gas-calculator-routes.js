const template = require('./gas-calculator.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('gas-calculator', {
      url: '/gas-calculator',
      template,
      controller: 'GasCalculatorCtrl',
      controllerAs: 'gasCalculator'
    });
}
