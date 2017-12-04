const templateCAN = require('./border-waits-can.html');
const templateUSA = require('./border-waits-usa.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('border-waits-can', {
      url: '/border-waits-can',
      template: templateCAN,
      controller: 'BorderWaitsCtrl',
      controllerAs: 'borderWaits'
    });
  $stateProvider
    .state('border-waits-usa', {
      url: '/border-waits-usa',
      template: templateUSA,
      controller: 'BorderWaitsCtrl',
      controllerAs: 'borderWaits'
    });
}
