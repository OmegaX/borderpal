const template = require('./unit-converter.html');
const templateMetric = require('./partials/metric.html');
const templateGas = require('./partials/gas.html');
const templateGroceries = require('./partials/groceries.html');
const templateMetricRightMenu = require('./partials/metric-right-menu.html');
const templateExchange = require('../shared-components/exchange-component/exchange-component.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('converter', {
      url: '/converter',
      template,
      controller: 'ConverterCtrl',
      controllerAs: 'unitConverter'
    })
    .state('converter.gas', {
      url: '/gas',
      views: {
        '': {
          template: templateGas
        },
        'right-side@converter': {
          template: templateExchange,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    })
    .state('converter.groceries', {
      url: '/groceries',
      views: {
        '': {
          template: templateGroceries
        },
        'right-side@converter': {
          template: templateExchange,
          controller: 'ExchangeCtrl',
          controllerAs: 'exchangeCtrl'
        }
      }
    })
    .state('converter.metric', {
      url: '/metric',
      views: {
        '': {
          template: templateMetric
        },
        'right-side@converter': {
          template: templateMetricRightMenu
        }
      }
    });
}

routes.$inject = ['$stateProvider'];
