const template = require('./gas-finder.html');
const exchangeTemplate = require('../shared-components/exchange-component/exchange-component.html');
const converterTemplate = require('../shared-components/price-converter-component/price-converter.html');

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
          template: converterTemplate,
          controller: 'PriceConverterCtrl',
          controllerAs: 'priceConverter'
        },
        'exchangeView@gas': {
          template: exchangeTemplate,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
