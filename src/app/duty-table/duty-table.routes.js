const template = require('./duty-table.html');

export default function routes($stateProvider) {
  $stateProvider
    .state('duty-table', {
      url: '/duty-table',
      template
    });
}

routes.$inject = ['$stateProvider'];
