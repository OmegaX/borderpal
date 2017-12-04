export default class BorderWaitsCtrl {
  constructor(BorderService) {
    this.BorderService = BorderService;
    this.init();
  }

  init() {
    this.getCDNBorderWaits();
    this.getUSBorderWaits();
  }

  getCDNBorderWaits() {
    this.BorderService.getCDNBorderWaits()
      .then((response) => {
        this.borderArray = response;
      });
  }

  getUSBorderWaits() {
    this.BorderService.getUSBorderWaits()
      .then((response) => {
        const xmlDOM = new DOMParser().parseFromString(response, 'text/xml');
        const borderArrayUS = this.xmlToJson(xmlDOM).border_wait_time.port;

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


// Modified version from here: http://davidwalsh.name/convert-xml-json
xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
  }
  else if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = this.xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(this.xmlToJson(item));
      }
    }
  }
  return obj;
}
}

