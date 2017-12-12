export default class BorderWaitsCtrl {
  constructor(BorderService) {
    this.BorderService = BorderService;
  }

  getCANwaits() {
    this.BorderService.getCDNBorderWaits()
      .then((response) => {
        this.borderArray = response.waitTimes;
      });
  }

  getUSwaits() {
    this.BorderService.getUSBorderWaits()
      .then((response) => {
        const xmlDOM = new DOMParser().parseFromString(response, 'text/xml');
        const borderArrayUS = this.BorderService.xmlToJson(xmlDOM).border_wait_time.port;

        this.borderArrayUS = borderArrayUS.map((border) => {
          const port = border.port_name;
          const crossing = (typeof border.crossing_name !== 'string') ? border.port_name : border.crossing_name;
          const passenger = border.passenger_vehicle_lanes.standard_lanes.operational_status;
          const commercial = border.commercial_vehicle_lanes.standard_lanes.operational_status;
          const updated = (typeof border.passenger_vehicle_lanes.standard_lanes.update_time !== 'string') ? 'N/A' : border.passenger_vehicle_lanes.standard_lanes.update_time;
          return {
            port, crossing, passenger, commercial, updated
          };
        });
      });
  }
}
