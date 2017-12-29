const template = require('./gas-calculator.html');
const exchangePartial = require('../shared-components/exchange-component/exchange-component.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('gas-calculator', {
      url: '/gas-calculator',
      views: {
        '': {
          template,
          controller: 'GasCalculatorCtrl',
          controllerAs: 'gasCalculator'
        },
        'exchangeView@gas-calculator': {
          template: exchangePartial,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
