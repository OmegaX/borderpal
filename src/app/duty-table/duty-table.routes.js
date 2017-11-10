routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
  .state('duty-table', {
    url: '/duty-table',
    template: require('./duty-table.html')
  });
}
