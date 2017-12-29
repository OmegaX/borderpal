const templateBorder = require('./border-waits.html');
const templateUSwaits = require('./partials/us-waits.html');
const templateCANwaits = require('./partials/can-waits.html');
// const templateUScams = require('./partials/us-cams.html');
// const templateCANcams = require('./partials/can-cams.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('border', {
      url: '/border',
      template: templateBorder,
      controller: 'BorderWaitsCtrl',
      controllerAs: 'borderWaits'
    })
    .state('border.us-waits', {
      url: '/us-waits',
      template: templateUSwaits
    })
    .state('border.can-waits', {
      url: '/can-waits',
      template: templateCANwaits
    });
    // .state('border.us-cams', {
    //   url: '/us-cams',
    //   template: templateUScams
    // })
    // .state('border.can-cams', {
    //   url: '/can-cams',
    //   template: templateCANcams
    // })
}

routes.$inject = ['$stateProvider'];
