import angular from 'angular';
import uirouter from 'angular-ui-router';
import ExchangeCtrl from './exchange-ctrl';
import ExchangeService from './exchange-service';

export default angular.module('borderPalApp.exchangeComponent', [uirouter])
  .controller('ExchangeCtrl', ExchangeCtrl)
  .service('ExchangeService', ExchangeService)
  .name;
