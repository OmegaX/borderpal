const templateBorder = require('./border.html');
const templateWaitsGeneric = require('./partials/waits-generic.html');
const templateWaitsUS = require('./partials/waits-us.html');
const templateWaitsCanada = require('./partials/waits-canada.html');
const templateCamsGeneric = require('./partials/cams-generic.html');
const templateWaitsNav = require('./partials/side-nav-waits.html');
const templateCamsNav = require('./partials/side-nav-cams.html');

export default function routes($stateProvider, $compileProvider) {
  // whitelist data for base64-encoded srcs returned from api
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

  $stateProvider
    .state('border', {
      url: '/border',
      template: templateBorder,
      controller: 'BorderCtrl',
      controllerAs: 'borderCtrl'
    })
    .state('border.waits', {
      url: '/waits',
      views: {
        '': {
          template: templateWaitsGeneric
        },
        'side-nav@border': {
          template: templateWaitsNav
        }
      }
    })
    .state('border.waits.us', {
      url: '/us',
      template: templateWaitsUS
    })
    .state('border.waits.canada', {
      url: '/canada',
      template: templateWaitsCanada
    })
    .state('border.cams', {
      url: '/cams',
      views: {
        '': {
          template: templateCamsGeneric
        },
        'side-nav@border': {
          template: templateCamsNav
        }
      }
    });
}

routes.$inject = ['$stateProvider', '$compileProvider', '$urlRouterProvider'];
