import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngBootstrap from 'angular-ui-bootstrap';
import formatAsCurrency from 'format-as-currency';

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/sass/custom.scss';

// custom files
import NavCtrl from './nav-ctrl';
import routing from './app.routes';
import dutyTable from './duty-table';
import unitConverter from './unit-converter';
import costEstimator from './cost-estimator';
import gasCalculator from './gas-calculator';
import borderWaits from './border-waits';
import ExchangeService from './shared-services/exchange-service';


angular.module('borderPalApp', [uirouter, ngBootstrap, formatAsCurrency, dutyTable, unitConverter, costEstimator, gasCalculator, borderWaits])
  .controller('NavCtrl', NavCtrl)
  .service('ExchangeService', ExchangeService)
  .config(routing);
