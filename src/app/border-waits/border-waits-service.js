import borderArrayUS from './us-border-info';

export default class BorderService {
  constructor($http, $q, $sce) {
    this.$http = $http;
    this.$q = $q;
    this.$sce = $sce;
  }

  getOurBorderArrayUS() {
    return borderArrayUS;
  }

  getCDNBorderWaits() {
    const url = 'http://localhost/server/get-border-waits-canada.php';
    return this.$http.post(url)
      .then(response => response.data);
  }

  getUSBorderWaits() {
    const url = 'http://localhost/server/get-border-waits-usa.php';
    return this.$http.post(url)
      .then(response => response.data);
  }

  xmlToJson(xml) {
    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j += 1) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }

    // do children if just one text node inside
    if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
      obj = xml.childNodes[0].nodeValue;
    } else if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i += 1) {
        const item = xml.childNodes.item(i);
        const { nodeName } = item;
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];
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

BorderService.$inject = ['$http', '$q', '$sce'];
