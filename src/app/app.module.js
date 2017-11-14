import 'bootstrap/dist/css/bootstrap.css';
import '../assets/sass/custom.scss';
//@require "./**/*.html" 

// third-party libraries
import angular from 'angular';

import uirouter from 'angular-ui-router';
import routing from './app.routes';
import ngBootstrap from 'angular-ui-bootstrap';

// custom files
import dutyTable from './duty-table';
import metricConverter from './metric-converter';
import costEstimator from './cost-estimator';

angular.module('borderPalApp', [uirouter, ngBootstrap, dutyTable, metricConverter, costEstimator])
  .config(routing);