import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMap from 'ngmap';
import ngSanitize from 'angular-sanitize';
import routes from './border-routes';
import BorderCtrl from './border-ctrl';
import BorderService from './border-service';

require('angularjs-geolocation');

export default angular.module('borderPalApp.borderWaits', [uirouter, ngMap, ngSanitize, 'geolocation'])
  .config(routes)
  .controller('BorderCtrl', BorderCtrl)
  .service('BorderService', BorderService)
  .name;
