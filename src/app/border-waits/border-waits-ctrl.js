export default class BorderWaitsCtrl {
  constructor(BorderService, $uibModal, $uibModalStack, NgMap, $scope) {
    this.BorderService = BorderService;
    this.$uibModal = $uibModal;
    this.$uibModalStack = $uibModalStack;
    this.$scope = $scope;
    this.NgMap = NgMap;
    this.init();
  }

  init() {
    this.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAnrb7ty9PGUxcRcciP4hWeMLth10-7Awc';
  }

  openMap() {
    this.NgMap.getMap({ id: this.mapParams.id }).then((map) => {
      const center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
  }

  getCANwaits() {
    this.BorderService.getCDNBorderWaits()
      .then((response) => {
        this.borderArray = response.waitTimes;
      });
  }

  openModal(border) {
    this.mapParams = {
      id: border.portID,
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

  static onlyCDNborders(port) {
    return port.border === 'Canadian Border';
  }

  static getDelayWording(crossing) {
    if (crossing.operational_status === 'Lanes Closed') {
      return 'Closed';
    }
    const minutesInt = parseInt(crossing.delay_minutes, 10);
    let wording = '';
    switch (true) {
      case (minutesInt === 0):
        wording = 'No Delay';
        break;
      case (minutesInt > 0):
        wording = `${minutesInt} min.`;
        break;
      default:
        wording = 'N/A';
    }
    return wording;
  }

  static checkExistence(variable) {
    if (typeof variable === 'undefined' || variable === null || variable === '' || !Object.keys(variable).length) {
      return 'N/A';
    }
    return variable;
  }

  getUSwaits() {
    this.BorderService.getUSBorderWaits()
      .then((response) => {
        const xmlDOM = new DOMParser().parseFromString(response, 'text/xml');
        const theirBorderArrayUS = this.BorderService.xmlToJson(xmlDOM).border_wait_time.port;
        const ourBorderArrayUS = this.BorderService.getOurBorderArrayUS();
        this.borderArrayUS = theirBorderArrayUS
          .filter(BorderWaitsCtrl.onlyCDNborders).map((port) => {
            const portID = port.port_number;
            const passengerDelay = port.passenger_vehicle_lanes.standard_lanes;
            const nexusDelay = port.passenger_vehicle_lanes.nexus_sentri_lanes;
            const commericalDelay = port.commercial_vehicle_lanes.standard_lanes;
            const updatedTime = port.passenger_vehicle_lanes.standard_lanes.update_time;
            const supplementalObj = ourBorderArrayUS.map(ourport => ourport)
              .find(ourport => ourport.id === portID);
            const mergedObj = {
              ...supplementalObj,
              portID,
              passenger: BorderWaitsCtrl.getDelayWording(BorderWaitsCtrl
                .checkExistence(passengerDelay)),
              nexus: BorderWaitsCtrl.getDelayWording(BorderWaitsCtrl
                .checkExistence(nexusDelay)),
              commercial: BorderWaitsCtrl.getDelayWording(BorderWaitsCtrl
                .checkExistence(commericalDelay)),
              updated: BorderWaitsCtrl.checkExistence(updatedTime)
            };
            return mergedObj;
          });
      });
  }
}

BorderWaitsCtrl.$inject = ['BorderService', '$uibModal', '$uibModalStack', 'NgMap', '$scope'];
