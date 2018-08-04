const template = require('./converter.html');
const templateUnits = require('./partials/units.html');
const templateUnitsRightMenu = require('./partials/units-right-menu.html');
const templateExchange = require('../shared-components/exchange-component/exchange-component.html');
const templatePriceConverter = require('../shared-components/price-converter-component/price-converter.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('converter', {
      url: '/converter',
      views: {
        '': {
          template,
          controller: 'ConverterCtrl',
          controllerAs: 'converter'
        },
        'right-side@converter': {
          template: templateExchange,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    })
    .state('converter.gas', {
      url: '/gas',
      views: {
        '': {
          template: templatePriceConverter,
          controller: 'PriceConverterCtrl',
          controllerAs: 'priceConverter'
        }
      }
    })
    .state('converter.groceries', {
      url: '/groceries',
      views: {
        '': {
          template: templatePriceConverter,
          controller: 'PriceConverterCtrl',
          controllerAs: 'priceConverter'
        }
      }
    })
    .state('converter.units', {
      url: '/units',
      views: {
        '': {
          template: templateUnits
        },
        'right-side@converter': {
          template: templateUnitsRightMenu
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
