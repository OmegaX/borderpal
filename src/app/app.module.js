import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngBootstrap from 'angular-ui-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/sass/custom.scss';

// custom files
import routing from './app.routes';
import dutyTable from './duty-table';
import metricConverter from './metric-converter';
import costEstimator from './cost-estimator';

angular.module('borderPalApp', [uirouter, ngBootstrap, dutyTable, metricConverter, costEstimator])
  .config(routing);
