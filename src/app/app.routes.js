routing.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routing($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/cost-estimator');
  $locationProvider.html5Mode(true);
}