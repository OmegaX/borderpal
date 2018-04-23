const template = require('./gas-calculator.html');
const exchangePartial = require('../shared-components/exchange-component/exchange-component.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('gas', {
      url: '/gas',
      views: {
        '': {
          template,
          controller: 'GasCalculatorCtrl',
          controllerAs: 'gasCalculator'
        },
        'exchangeView@gas': {
          template: exchangePartial,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
