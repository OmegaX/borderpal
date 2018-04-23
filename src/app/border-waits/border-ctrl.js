import moment from 'moment-es6';

export default class BorderCtrl {
  constructor(BorderService, $uibModal, $uibModalStack, NgMap, $scope, geolocation, $state, $stateParams) {
    this.BorderService = BorderService;
    this.$uibModal = $uibModal;
    this.$uibModalStack = $uibModalStack;
    this.$scope = $scope;
    this.NgMap = NgMap;
    this.geolocation = geolocation;
    this.state = $state;
    this.stateParams = $stateParams;
    this.coords = {
      enabled: false,
      lat: null,
      long: null
    };
    this.init();
  }

  init() {
    this.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnrb7ty9PGUxcRcciP4hWeMLth10-7Awc';
    this.timeLastCheckedCAN = null;
    this.timeLastCheckedUS = null;
    // if page refreshed while in cams state, return to default
    if (this.state.current.name === 'border.cams') {
      this.state.transitionTo('border.waits.us');
    }
    this.geolocation.getLocation().then((data) => {
      this.coords = {
        enabled: true,
        lat: data.coords.latitude,
        long: data.coords.longitude
      };
      this.getBorderWaits();
      this.sort = 'distance';
    }, () => {
      this.getBorderWaits();
      this.sort = 'longitude';
    });
  }

  getBorderWaits() {
    if (this.state.current.name === 'border.waits.us') {
      this.getUSwaits();
    }
    this.getCANwaits();
  }

  camNavClicked(side) {
    const selectedPort = this.selectedCams;
    this.camClicked(selectedPort, side);
  }

  camClicked(selectedPort, side) {
    this.h2 = (side === 'Canada' ? 'Cams on the Canadian side of the border for US-bound travellers'
      : 'Cams on US side of the border for home-bound travellers');
    this.selectedCams = selectedPort;
    const existingCamArray = this.BorderService.getTrafficCams();
    const matchingPorts = existingCamArray
      .filter(port => port.name === selectedPort.name && port.side === side);
    if (selectedPort.protected === true) {
      const ports = matchingPorts.map(port => port);
      this.BorderService.getProtectedCams(ports)
        .then((response) => {
          const mergedCamArray = matchingPorts.map((existingCamObj) => {
            const returnedCamObj = response.map(returned => returned)
              .find(returned => returned.id === existingCamObj.id);
            const mergedCamObj = {
              ...existingCamObj,
              ...returnedCamObj
            };
            return mergedCamObj;
          });
          this.cams = mergedCamArray;
          this.showCams = true;
        }, () => {});
    } else {
      this.cams = matchingPorts;
      this.showCams = true;
    }
  }

  getDistance(lat, long) {
    let distanceLong = long - this.coords.long;
    distanceLong = Math.abs(distanceLong);
    let distanceLat = lat - this.coords.lat;
    distanceLat = Math.abs(distanceLat);
    return distanceLong + distanceLat;
  }

  getCANwaits() {
    this.h1 = 'Canadian Border Waits';
    this.h2 = 'For Travellers Returning Home';
    let minutesSince = 0;
    const timestamp = moment(new Date(), 'HH:mm:ss');
    if (this.timeLastCheckedCAN !== null) {
      minutesSince = this.timeLastCheckedCAN.diff(moment(timestamp), 'minutes');
    }
    if (this.timeLastCheckedCAN === null || minutesSince < -5) {
      this.timeLastCheckedCAN = timestamp;
      this.mergedBorderArrayCAN = [];
      this.BorderService.getCDNBorderWaits()
        .then((response) => {
          this.mergedBorderArrayCAN = response.waitTimes.map((port) => {
            const theirBorderObj = {
              passengerDelay: BorderCtrl.getDelayWordingCAN(port['poe-trav-status']),
              commercialDelay: BorderCtrl.getDelayWordingCAN(port['poe-comm-status']),
              updateTime: moment(port['poe-updated']).startOf('hour').fromNow()
            };
            const ourBorderObj = this.BorderService.getOurBorderArrayCAN().map(ourport => ourport)
              .find(ourport => ourport.id === port['poe-name']);
            if (this.coords.enabled) {
              ourBorderObj.distance =
                this.getDistance(ourBorderObj.latitude, ourBorderObj.longitude);
            }
            const mergedBorderObj = {
              ...theirBorderObj,
              ...ourBorderObj
            };
            return mergedBorderObj;
          });
        }, () => {});
    }
  }

  getUSwaits() {
    this.h1 = 'US Border Waits';
    this.h2 = 'For travellers to the US';
    let minutesSince = 0;
    const timeStamp = moment(new Date(), 'HH:mm:ss');
    if (this.timeLastCheckedUS !== null) {
      minutesSince = this.timeLastCheckedUS.diff(moment(timeStamp), 'minutes');
    }
    if (this.timeLastCheckedUS === null || minutesSince < -5) {
      this.mergedBorderArrayUS = [];
      this.timeLastCheckedUS = timeStamp;
      this.BorderService.getUSBorderWaits()
        .then((response) => {
          this.mergedBorderArrayUS = response.map((port) => {
            const theirBorderObj = {
              portID: port.portID,
              passengerDelay: BorderCtrl
                .getDelayWordingUS(port.passengerDelay, port.passengerStatus),
              commercialDelay: BorderCtrl
                .getDelayWordingUS(port.commercialDelay, port.commercialStatus),
              updateTime: BorderCtrl.checkTime(port.updateTime)
            };
            const ourBorderObj = this.BorderService.getOurBorderArrayUS().map(ourport => ourport)
              .find(ourport => ourport.id === port.portID);
            if (this.coords.enabled) {
              ourBorderObj.distance =
                this.getDistance(ourBorderObj.latitude, ourBorderObj.longitude);
            }
            const mergedBorderObj = {
              ...theirBorderObj,
              ...ourBorderObj
            };
            return mergedBorderObj;
          });
        }, () => {});
    }
  }

  openMap() {
    this.NgMap.getMap({ id: this.mapParams.id }).then((map) => {
      const center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
  }

  openModal(border) {
    this.mapParams = {
      id: border.id,
      lat: border.latitude,
      lng: border.longitude,
      title: border.name,
      connection: border.connection,
      zoom: 16
    };
    const animationsEnabled = true;
    const modalInstance = this.$uibModal.open({
      animation: animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'mapModal.html',
      scope: this.$scope,
      size: 'lg'
    }).result
      .then(() => {
      // handle dismiss case
      }, () => {
        this.$uibModalStack.dismissAll();
      });
    this.openMap();
    return modalInstance;
  }

  closeModal() {
    this.$uibModalStack.dismissAll();
  }

  static getDelayWordingCAN(status) {
    if (status.toUpperCase() === 'NOT APPLICABLE') {
      return 'N/A';
    }
    return status;
  }

  static getDelayWordingUS(delay, status) {
    if (status.toUpperCase() === 'LANES CLOSED') {
      return 'Closed';
    }
    if (status.toUpperCase() === 'UPDATE PENDING') {
      return 'Update Pending';
    }
    const minutesInt = parseInt(delay, 10);
    switch (true) {
      case (minutesInt === 0):
        return 'No Delay';
      case (minutesInt === 1):
        return `${minutesInt} minute`;
      case (minutesInt > 1):
        return `${minutesInt} minutes`;
      default:
        return 'N/A';
    }
  }

  static getTimeOffset(timeZ) {
    const timeZone = timeZ.trim().toUpperCase();
    switch (true) {
      case (timeZone === 'PST'):
        return '16:00';
      case (timeZone === 'MST'):
        return '17:00';
      case (timeZone === 'CST'):
        return '18:00';
      case (timeZone === 'EST'):
        return '19:00';
      default:
        return '16:00';
    }
  }

  static checkTime(timeFromAPI) {
    if (typeof timeFromAPI === 'undefined' || timeFromAPI === null || timeFromAPI === '') {
      return 'N/A';
    }
    const wholeTime = timeFromAPI.replace('At ', '');
    let twelveHours = '';
    let timeZone = '';
    let timeOffset = '';
    let splitTime = '';
    let meridiem = '';
    if (wholeTime.search(/noon/i) > -1) {
      twelveHours = '12:00 PM';
      timeZone = wholeTime[1];
      timeOffset = BorderCtrl.getTimeOffset(timeZone);
    } else if (wholeTime.search(/midnight/i) > -1) {
      twelveHours = '12:00 AM';
      timeZone = wholeTime[1];
      timeOffset = BorderCtrl.getTimeOffset(timeZone);
    } else {
      splitTime = wholeTime.split(' ');
      const twelve = splitTime[0].trim();
      meridiem = splitTime[1].trim();
      twelveHours = `${twelve} ${meridiem}`;
      timeZone = splitTime[2].trim();
      timeOffset = BorderCtrl.getTimeOffset(timeZone);
    }
    const timeCompare = `${twelveHours} GMT+${timeOffset}`;

    return moment(timeCompare, ['HH:mm A Z']).startOf('hour').fromNow();
  }
}

BorderCtrl.$inject = ['BorderService', '$uibModal', '$uibModalStack', 'NgMap', '$scope', 'geolocation', '$state', '$stateParams'];
