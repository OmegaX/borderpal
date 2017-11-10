import 'bootstrap/dist/css/bootstrap.css';
import '../assets/sass/custom.scss';

// third-party libraries
import angular from 'angular';
import ngBootstrap from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';
import routes from './app.routes';

// custom files
import dutyTable from './duty-table';
import metricConverter from './metric-converter';
import costEstimator from './cost-estimator';

angular.module('borderPalApp', [ngBootstrap, uirouter, dutyTable, metricConverter, costEstimator])
  .config(routes);