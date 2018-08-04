const template = require('./gas-finder.html');
const exchangePartial = require('../shared-components/exchange-component/exchange-component.html');
const converterPartial = require('../shared-components/price-converter-component/price-converter.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('gas', {
      url: '/gas',
      views: {
        '': {
          template,
          controller: 'GasFinderCtrl',
          controllerAs: 'gasFinder'
        },
        'converterView@gas': {
          template: converterPartial,
          controller: 'PriceConverterCtrl',
          controllerAs: 'priceConverter'
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
