const template = require('./converter.html');
const templateUnits = require('./partials/units.html');
const templateLeftNav = require('./partials/units-nav-left.html');
const templateRightNav = require('./partials/units-nav-right.html');
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
        'left-side@converter': {
          template: templateLeftNav
        },
        'right-side@converter': {
          template: templateExchange,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    })
    .state('converter.price', {
      url: '/price',
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
          template: templateRightNav
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
