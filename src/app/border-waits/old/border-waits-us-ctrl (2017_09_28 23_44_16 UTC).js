/*global app*/
/*global $*/

(function () {
    'use strict';

    app.controller('USwaitController', ['$scope', 'USwaitService', 'StationsFindService', 'StationsLogoService', 'anchorSmoothScroll', function ($scope, USwaitService, StationsFindService, StationsLogoService, anchorSmoothScroll) {

        $scope.divShow = {
            mapShow: false,
            gasShow: false
        };

        function getUSwaits() {
            USwaitService.USwaitsMethod().then(function (result) {
                result = result.data;
                $scope.ports = [];
                $scope.time = "Last updated today at " + result[1].time + " EDT";
                var i = 0, laneNEX = null, laneReg = null;
                for (i = 0; i < 29; i += 1) {
                    // change 'lanes' pluralism depending on NEXUS lanes open
                    if (result[i].passenger_vehicle_lanes.NEXUS_SENTRI_lanes.lanes_open === "") {
                        result[i].passenger_vehicle_lanes.NEXUS_SENTRI_lanes.lanes_open = "no";
                        laneNEX = "lanes";
                    } else if (result[i].passenger_vehicle_lanes.NEXUS_SENTRI_lanes.lanes_open === "1") {
                        laneNEX = "lane";
                    } else {
                        laneNEX = "lanes";
                    }
                    // change 'lanes' pluralism depending on regular lanes open
                    if (result[i].passenger_vehicle_lanes.standard_lanes.lanes_open === "") {
                        result[i].passenger_vehicle_lanes.standard_lanes.lanes_open = "no";
                        laneReg = "lanes";
                    } else if (result[i].passenger_vehicle_lanes.standard_lanes.lanes_open === "1") {
                        laneReg = "lane";
                    } else {
                        laneReg = "lanes";
                    }
                    $scope.ports[i] = {
                        port_name: result[i].port_name,
                        crossing_name: result[i].crossing_name,
                        delay: result[i].passenger_vehicle_lanes.standard_lanes.delay_minutes,
                        updated: " (" + result[i].passenger_vehicle_lanes.standard_lanes.update_time + ")",
                        lanes: result[i].passenger_vehicle_lanes.standard_lanes.lanes_open +
                            " standard " + laneReg + " and " + result[i].passenger_vehicle_lanes.NEXUS_SENTRI_lanes.lanes_open +
                            " NEXUS " + laneNEX + " open",
                        hours: result[i].hours,
                        date: result[i].date,
                        prov: null,
                        zip: null
                    };
                    switch ($scope.ports[i].crossing_name) {
                    case ("Peace Arch"):
                        $scope.ports[i].port_name = "Connecting Surrey, BC to Blaine, WA";
                        $scope.ports[i].prov = "BC";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-122.756554";
                        break;
                    case ("Pacific Highway"):
                        $scope.ports[i].port_name = "Connecting Surrey, BC to Blaine, WA";
                        $scope.ports[i].prov = "BC";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-122.735515";
                        break;
                    case ("Point Roberts"):
                        $scope.ports[i].port_name = "Connecting Delta, BC to Point Roberts, WA";
                        $scope.ports[i].prov = "BC";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-123.068345";
                        break;
                    case ("Windsor Tunnel"):
                        $scope.ports[i].port_name = "Connecting Windsor, ON to Detroit, MI";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "42.3239";
                        $scope.ports[i].lng = "-83.04026";
                        break;
                    case ("Peace Bridge"):
                        $scope.ports[i].port_name = "Connecting Fort Erie, ON to Buffalo, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "42.90699";
                        $scope.ports[i].lng = "-78.90599";
                        break;
                    case ("Thousand Islands Bridge"):
                        $scope.ports[i].port_name = "Connecting Lansdowne, ON to Alexandria Bay, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "44.346218";
                        $scope.ports[i].lng = "-75.982564";
                        break;
                    case ("Ambassador Bridge"):
                        $scope.ports[i].port_name = "Connecting Windsor, ON to Detroit, MI";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "42.31175";
                        $scope.ports[i].lng = "-83.07415";
                        break;
                    case ("Milltown"):
                        $scope.ports[i].port_name = "Connecting St Stephen, NB to Calais, ME";
                        $scope.ports[i].prov = "NB";
                        $scope.ports[i].lat = "45.17013";
                        $scope.ports[i].lng = "-67.2967";
                        break;
                    case ("Rainbow Bridge"):
                        $scope.ports[i].crossing_name = "Rainbow Bridge (Niagara Falls)";
                        $scope.ports[i].port_name = "Connecting Niagara Falls, ON to Niagara Falls, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "43.09013";
                        $scope.ports[i].lng = "-79.06779";
                        break;
                    case ("Bluewater Bridge"):
                        $scope.ports[i].port_name = "Connecting Point Edward, ON to Port Huron, MI";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "42.9987";
                        $scope.ports[i].lng = "-82.4235";
                        break;
                    case ("International Bridge   SSM"):
                        $scope.ports[i].port_name = "Connecting Sault Ste. Marie, ON to Sault Ste. Marie, MI";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "46.50847";
                        $scope.ports[i].lng = "-84.3608";
                        break;
                    case ("Ferry Point"):
                        $scope.ports[i].port_name = "Connecting St Stephen NB, to Calais, ME";
                        $scope.ports[i].prov = "NB";
                        $scope.ports[i].lat = "45.19202";
                        $scope.ports[i].lng = "-67.28363";
                        break;
                    case ("International Avenue"):
                        $scope.ports[i].port_name = "Connecting St Stephen, NB to Calais, ME";
                        $scope.ports[i].prov = "NB";
                        $scope.ports[i].lat = "45.161016";
                        $scope.ports[i].lng = "-67.3026";
                        break;
                    case ("Whirlpool Bridge"):
                        $scope.ports[i].port_name = "Connecting Niagara Falls, ON to Niagara Falls, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "43.109265";
                        $scope.ports[i].lng = "-79.058351";
                        break;
                    case ("Lewiston Bridge"):
                        $scope.ports[i].port_name = "Connecting Niagara-on-the-Lake, ON to Lewiston, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "43.15307";
                        $scope.ports[i].lng = "-79.04441";
                        break;
                    }
                    switch ($scope.ports[i].port_name) {
                    case ("Lynden"):
                        $scope.ports[i].crossing_name = "Lynden";
                        $scope.ports[i].port_name = "Connecting Langley/Aldergrove, BC to Lynden, WA";
                        $scope.ports[i].prov = "BC";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-122.48515";
                        $scope.ports[i].zip = "98264";
                        break;
                    case ("Sumas"):
                        $scope.ports[i].crossing_name = "Sumas";
                        $scope.ports[i].port_name = "Connecting Abbotsford, BC to Sumas, WA";
                        $scope.ports[i].prov = "BC";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-122.265403";
                        break;
                    case ("International Falls"):
                        $scope.ports[i].crossing_name = "International Falls";
                        $scope.ports[i].port_name = "Connecting Fort Frances, ON to International Falls, MN";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "48.6078";
                        $scope.ports[i].lng = "-93.40144";
                        break;
                    case ("Sweetgrass"):
                        $scope.ports[i].crossing_name = "Sweetgrass";
                        $scope.ports[i].port_name = "Connecting Coutts, AB to Sweet Grass, MT";
                        $scope.ports[i].prov = "AB";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-111.96038";
                        break;
                    case ("Pembina"):
                        $scope.ports[i].crossing_name = "Pembina";
                        $scope.ports[i].port_name = "Connecting Emerson, MB to Pembina, ND";
                        $scope.ports[i].prov = "MB";
                        $scope.ports[i].lat = "49";
                        $scope.ports[i].lng = "-97.23766";
                        break;
                    case ("Ogdensburg"):
                        $scope.ports[i].crossing_name = "Ogdensburg-Prescott International Bridge";
                        $scope.ports[i].port_name = "Connecting Edwardsburgh/Cardinal, ON, to Ogdensburg, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "44.73329";
                        $scope.ports[i].lng = "-75.45765";
                        break;
                    case ("Norton"):
                        $scope.ports[i].crossing_name = "Norton";
                        $scope.ports[i].port_name = "Connecting Stanhope, QC to Norton, VT";
                        $scope.ports[i].prov = "QC";
                        $scope.ports[i].lat = "45.01083";
                        $scope.ports[i].lng = "-71.79336";
                        break;
                    case ("Champlain"):
                        $scope.ports[i].crossing_name = "Champlain– St.Bernard de Lacolle";
                        $scope.ports[i].port_name = "Blackpool, QC to Champlain, NY";
                        $scope.ports[i].prov = "QC";
                        $scope.ports[i].lat = "45.0089";
                        $scope.ports[i].lng = "-73.45243";
                        break;
                    case ("Madawaska"):
                        $scope.ports[i].crossing_name = "Edmundston-Madawaska Bridge";
                        $scope.ports[i].port_name = "Edmundston, NB to Madawaska, ME";
                        $scope.ports[i].prov = "NB";
                        $scope.ports[i].lat = "47.360099";
                        $scope.ports[i].lng = "-68.328685";
                        break;
                    case ("Massena"):
                        $scope.ports[i].crossing_name = "Massena (Seaway Bridge)";
                        $scope.ports[i].port_name = "Cornwall, ON to Massena, NY";
                        $scope.ports[i].prov = "ON";
                        $scope.ports[i].lat = "44.99066";
                        $scope.ports[i].lng = "-74.73947";
                        break;
                    case ("Houlton"):
                        $scope.ports[i].crossing_name = "Houlton-Woodstock";
                        $scope.ports[i].port_name = "Richmond, NB to Houlton, ME";
                        $scope.ports[i].prov = "NB";
                        $scope.ports[i].lat = "46.13522";
                        $scope.ports[i].lng = "-67.78126";
                        break;
                    case ("Jackman"):
                        $scope.ports[i].crossing_name = "Armstrong-Jackman";
                        $scope.ports[i].port_name = "Armstrong, QC to Jackman, ME";
                        $scope.ports[i].prov = "QC";
                        $scope.ports[i].lat = "45.80575";
                        $scope.ports[i].lng = "-70.39679";
                        break;
                    case ("Highgate Springs"):
                        $scope.ports[i].crossing_name = "Highgate Springs–St.Armand/Philipsburg";
                        $scope.ports[i].port_name = "St.Armand, QC to Highgate, VT";
                        $scope.ports[i].prov = "QC";
                        $scope.ports[i].lat = "45.01553";
                        $scope.ports[i].lng = "-73.08466";
                        break;
                    case ("Derby Line"):
                        $scope.ports[i].crossing_name = "Derby Line-Stanstead";
                        $scope.ports[i].port_name = "Stanstead, QC to Derby Line, VT";
                        $scope.ports[i].prov = "QC";
                        $scope.ports[i].lat = "45.00574";
                        $scope.ports[i].lng = "-72.0994";
                        break;
                    }
                    if ($scope.ports[i].delay === "") {
                        $scope.ports[i].delay = "Update Pending";
                        $scope.ports[i].lanes = null;
                        $scope.ports[i].updated = null;
                    } else if ($scope.ports[i].delay === "0") {
                        $scope.ports[i].delay = "No wait";
                    } else {
                        $scope.ports[i].delay = $scope.ports[i].delay + " minutes";
                    }
                    if ($scope.ports[i].delay === "") {
                        $scope.ports[i].delay = "N/A";
                    } else if ($scope.ports[i].delay === "0") {
                        $scope.ports[i].delay = "No wait";
                    }
                }
                $(".spinner").hide();
            });
        }

        getUSwaits();

        $scope.selectedRow = null;
        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index;
        };

        $scope.getGasPrices = function (crossing_name, zip) {
            $(".spinner").show();
            StationsFindService.gasMethod(zip).then(function (result) {
                $scope.result = result.data;
                $scope.stations = [];
                $scope.portgasname = "Current Gas Prices Near " + crossing_name;
                $scope.USgallon = "US/gal";
                var i = 0, brand = null;
                for (i = 0; i < $scope.result.length; i += 1) {
                    $scope.stations[i] = {
                        index: i,
                        logo: null,
                        brand: $scope.result[i].brand,
                        address: $scope.result[i].address,
                        price: "$" + $scope.result[i].price
                    };
                    brand = $scope.result[i].brand;
                    $scope.stations[i].logo = StationsLogoService.stationMethod(brand);
                }
                $(".spinner").hide();
            });
            $scope.gotoElement('gasdiv');
        };

        $scope.openGoogleMap = function (crossing_name, lat, lng, index) {
            $scope.setClickedRow(index);
            $scope.portmapname = crossing_name;
            var google = null, myCenter = null, mapProp = null, map = null, marker = null, document = null;
            myCenter = new google.maps.LatLng(lat, lng);
            mapProp = {
                center: myCenter,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            marker = new google.maps.Marker({
                position: myCenter
            });
            marker.setMap(map);
            $scope.divShow.mapShow = true;
            $scope.gotoElement('mapdiv');
        };

        $scope.gotoElement = function (eID) {
            anchorSmoothScroll.scrollTo(eID);
        };

    }]);
}());