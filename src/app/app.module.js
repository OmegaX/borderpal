import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngBootstrap from 'ui-bootstrap4';
import '../assets/sass/main.scss';
import routing from './app.routes';
import converter from './converter';
import costEstimator from './cost-estimator';
import gasFinder from './gas-finder';
import borderWaits from './border-waits';
import NavCtrl from './shared-components/layout-components/nav-ctrl';
import headerTemplate from './shared-components/layout-components/header.html';
import navbarTemplate from './shared-components/layout-components/navbar.html';
import footerTemplate from './shared-components/layout-components/footer.html';
import percentageField from './shared-functions/percentage-directive';

require('angular-animate');

angular.module('borderPalApp', [uirouter, ngBootstrap, converter, costEstimator, gasFinder, borderWaits, 'ngAnimate'])
  .component('header', {
    template: headerTemplate
  })
  .component('navMain', {
    template: navbarTemplate,
    controller: NavCtrl,
    controllerAs: 'navCtrl'
  })
  .component('footer', {
    template: footerTemplate
  })
  .directive('percentageField', percentageField)
  .config(routing);
