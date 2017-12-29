import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngMap from 'ngmap';

import routes from './border-waits-routes';
import BorderWaitsCtrl from './border-waits-ctrl';
import BorderService from './border-waits-service';

export default angular.module('borderPalApp.borderWaits', [uirouter, ngMap])
  .config(routes)
  .controller('BorderWaitsCtrl', BorderWaitsCtrl)
  .service('BorderService', BorderService)
  .name;
