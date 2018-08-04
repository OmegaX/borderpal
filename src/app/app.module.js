import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngBootstrap from 'ui-bootstrap4';

import '../assets/sass/main.scss';
import routing from './app.routes';
import converter from './converter';
import costEstimator from './cost-estimator';
import gasFinder from './gas-finder';
import borderWaits from './border-waits';
import NavCtrl from './shared-components/navbar-component/nav-ctrl';
import navbarTemplate from './shared-components/navbar-component/navbar.html';
import footerTemplate from './shared-components/footer-component/footer.html';
import percentageField from './shared-functions/percentage-directive';

angular.module('borderPalApp', [uirouter, ngBootstrap, converter, costEstimator, gasFinder, borderWaits])
  .component('nav', {
    template: navbarTemplate,
    controller: NavCtrl,
    controllerAs: 'nav'
  })
  .component('footer', {
    template: footerTemplate
  })
  .directive('percentageField', percentageField)
  .config(routing);
