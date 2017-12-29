export default function routing($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/cost-estimator');
  $locationProvider.html5Mode(true);
}

routing.$inject = ['$urlRouterProvider', '$locationProvider'];
