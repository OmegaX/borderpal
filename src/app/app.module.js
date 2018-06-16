import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngBootstrap from 'ui-bootstrap4';

import '../assets/sass/main.scss';
import routing from './app.routes';
import unitConverter from './unit-converter';
import costEstimator from './cost-estimator';
import gasCalculator from './gas-calculator';
import borderCtrl from './border-waits';
import exchangeComponent from './shared-components/exchange-component';
import navbarTemplate from './shared-components/navbar-component/navbar.html';
import NavCtrl from './shared-components/navbar-component/nav-ctrl';
import footerTemplate from './shared-components/footer-component/footer.html';
import percentageField from './shared-functions/percentage-directive';

angular.module('borderPalApp', [uirouter, ngSanitize, ngBootstrap, unitConverter, costEstimator, gasCalculator, borderCtrl, exchangeComponent])
  .component('navbar', {
    template: navbarTemplate,
    controller: NavCtrl,
    controllerAs: 'navCtrl'
  })
  .component('footer', {
    template: footerTemplate
  })
  .directive('percentageField', percentageField)
  .config(routing);
