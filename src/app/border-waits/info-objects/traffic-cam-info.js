const trafficCamArray = [
  {
    id: 'BC259',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/259.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Sumas',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Huntingdon/Sumas',
    caption: 'Hwy 11 at Farmer Rd, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC260',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/260.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Sumas',
    direction: 'south',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Huntingdon/Sumas',
    caption: 'Hwy 11 at Farmer Rd, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'BC171',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/171.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Sumas',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Huntingdon/Sumas',
    caption: 'Hwy 11 and 2nd Ave, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC170',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/170.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Sumas',
    direction: 'south',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Huntingdon/Sumas',
    caption: 'Hwy 11 and 2nd Ave, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA01',
    src: 'http://images.wsdot.wa.gov/nw/009vc09816.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Sumas',
    side: 'US',
    province: 'BC',
    state: 'WA',
    caption1: 'Sumas',
    caption: 'Truck Spur looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA02',
    src: 'http://images.wsdot.wa.gov/nw/009vc09781.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Sumas',
    side: 'US',
    province: 'BC',
    state: 'WA',
    caption1: 'Sumas',
    caption: 'Cherry St. looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC293',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/293.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Aldergrove',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Aldergrove/Lynden',
    caption: 'Hwy 13 at 264th St Diversion, south of 8th Ave, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC261',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/261.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Aldergrove',
    direction: 'south',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption1: 'Aldergrove/Lynden',
    caption: 'Hwy 13 at 264th St Diversion, south of 8th Ave, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'BC168',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/168.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Aldergrove',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 13 and 0 Ave, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC212',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/212.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 99 at 8th Avenue in White Rock, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC539',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/539.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'west',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 99 at 8th Avenue in White Rock, looking west at southbound ramp from 8th Ave',
    lat: 1,
    long: 1
  },
  {
    id: 'BC444',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/444.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'south',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 99 at 8th Avenue in White Rock, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'BC445',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/445.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'south',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Beach Road - Hwy 99 near Canada/USA border, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'BC14',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/14.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Beach Road - Hwy 99 at Canada/USA border, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC13',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/13.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Douglas (Peace Arch)',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 99 at Peace Arch border crossing, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA03',
    src: 'http://images.wsdot.wa.gov/nw/005vc27650.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Douglas (Peace Arch)',
    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'Last cam before border, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA04',
    src: 'http://images.wsdot.wa.gov/nw/005vc27623.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Douglas (Peace Arch)',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'I-5 at D St., looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA05',
    src: 'http://images.wsdot.wa.gov/nw/005vc27613.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Douglas (Peace Arch)',
    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'I-5 D St. offramp, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA06',
    src: 'http://images.wsdot.wa.gov/nw/005vc27556.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Douglas (Peace Arch)',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'I-5 and Mitchell Ave., looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA07',
    src: 'http://images.wsdot.wa.gov/nw/005vc27512.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Douglas (Peace Arch)',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'I-5: SR 543 Interchange looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA09',
    src: 'http://images.wsdot.wa.gov/nw/543vc00098.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Pacific Highway',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'SR 543: Duty Free, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA10',
    src: 'http://images.wsdot.wa.gov/nw/543vc00081.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Pacific Highway',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'SR 543: D St, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA11',
    src: 'http://images.wsdot.wa.gov/nw/543vc00056.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Pacific Highway',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'SR 543: H St, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'WA12',
    src: 'http://images.wsdot.wa.gov/nw/543vc00026.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Pacific Highway',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'SR 543: Boblett St, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'WA08',
    src: 'http://images.wsdot.wa.gov/nw/005vc27512.jpg',
    source: 'http://www.wsdot.com/traffic/Cameras/default.aspx',
    name: 'Pacific Highway',

    side: 'US',
    province: 'BC',
    state: 'WA',
    caption: 'I-5: SR 543 Interchange, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'BC477',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/477.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 15 at 8th Ave, in South Surrey, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC562',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/562.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 15 at 8th Ave, in South Surrey, looking west',
    lat: 1,
    long: 1
  },
  {
    id: 'BC563',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/563.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Hwy 15 at 8th Ave, in South Surrey, looking east.',
    lat: 1,
    long: 1
  },
  {
    id: 'BC16',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/16.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Pacific Crossing at 2nd Avenue, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC15',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/15.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Pacific Crossing at the border, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'BC564',
    src: 'http://images.drivebc.ca/bchighwaycam/pub/cameras/564.jpg',
    source: 'http://www.drivebc.ca/#webcams',
    name: 'Pacific Highway',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Pacific Crossing at 2nd Avenue, looking south',
    lat: 1,
    long: 1
  },
  {
    id: 'ON1',
    src: '',
    url: 'www.ambassadorbridge.com/liveCan/readImage.asp?dummy=1516811268998',
    source: 'www.ambassadorbridge.com',
    name: 'Ambassador Bridge',
    direction: 'north',
    side: 'Canada',
    province: 'BC',
    state: 'WA',
    caption: 'Pacific Crossing at the border, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'ON2',
    src: '',
    url: 'www.ambassadorbridge.com/liveUS/readImage.asp?dummy=1516811603165',
    source: 'www.ambassadorbridge.com',
    name: 'Ambassador Bridge',

    side: 'US',
    province: 'ON',
    state: 'MI',
    caption: 'US Plaza - Ambassador Bridge, Detroit Michigan',
    lat: 1,
    long: 1
  },
  {
    id: 'ON11',
    src: '',
    url: 'http://www.mto.gov.on.ca/english/traveller/compass/camera/pictures/LondonCamera/windsor/loc02.jpg',
    source: 'http://www.mto.gov.on.ca',
    name: 'Ambassador Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'MI',
    caption: 'College Ave and Hwy 3 near the Ambassador Bridge',
    lat: 1,
    long: 1
  },
  {
    id: 'ON3',
    src: 'http://216.8.159.148:5020/axis-cgi/jpg/image.cgi',
    source: 'http://www.dwtunnel.com',
    name: 'Detroit-Windsor Tunnel',
    side: 'Canada',
    province: 'ON',
    state: 'MI',
    caption: 'US-bound traffic on Canadian side',
    lat: 1,
    long: 1
  },
  {
    id: 'ON4',
    src: 'http://216.8.159.21/axis-cgi/jpg/image.cgi',
    source: 'http://www.dwtunnel.com',
    name: 'Detroit-Windsor Tunnel',
    side: 'US',
    province: 'ON',
    state: 'MI',
    caption: 'Canadian-bound traffic on the US side',
    lat: 1,
    long: 1
  },
  {
    id: 'ON5',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/NORTHPOLEWEBCAM/snap_c1.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'MI',
    caption: 'Entering the US',
    lat: 1,
    long: 1
  },
  {
    id: 'ON6',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/TOLLNP1WEBCAM/snap_c1.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'MI',
    caption: 'Entering the US',
    lat: 1,
    long: 1
  },
  {
    id: 'ON7',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/28_5POLEWEBCAM.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'MI',
    caption: 'Entering the US',
    lat: 1,
    long: 1
  },
  {
    id: 'ON8',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/C1POLEWEBCAM2/snap_c1.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'US',
    province: 'ON',
    state: 'MI',
    caption: 'CBSA inspection booths entering Canada',
    lat: 1,
    long: 1
  },
  {
    id: 'ON9',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/47POLEWEBCAM.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'US',
    province: 'ON',
    state: 'MI',
    caption: 'Entering Canada',
    lat: 1,
    long: 1
  },
  {
    id: 'ON10',
    src: '',
    url: 'http://68.65.176.13/~bridge/webcam/285webcam2/snap_c1.jpg',
    source: 'http://www.saultbridge.com/',
    name: 'International Bridge',
    side: 'US',
    province: 'ON',
    state: 'MI',
    caption: 'Entering Canada',
    lat: 1,
    long: 1
  },
  {
    id: 'ON12',
    src: 'http://207.35.43.164/jpeg',
    url: '',
    source: 'http://www.peacebridge.com',
    name: 'Peace Bridge',
    side: 'US',
    province: 'ON',
    state: 'NY',
    caption: 'Bridge deck to Canada',
    lat: 1,
    long: 1
  },
  {
    id: 'ON13',
    src: 'http://207.35.43.162/jpeg',
    url: '',
    source: 'http://www.peacebridge.com',
    name: 'Peace Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'NY',
    caption: 'US inspection plaza',
    lat: 1,
    long: 1
  },
  {
    id: 'ON',
    src: 'http://www.mtocdn.ca/english/traveller/compass/camera/pictures/OttaCamera/loc41.jpg',
    source: 'http://www.mto.gov.on.ca',
    name: 'Thousand Islands Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'NY',
    caption: '401 East of Hwy 137',
    lat: 1,
    long: 1
  },
  {
    id: 'ON',
    src: 'http://www.mtocdn.ca/english/traveller/compass/camera/pictures/OttaCamera/loc42.jpg',
    source: 'http://www.mto.gov.on.ca',
    name: 'Thousand Islands Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'NY',
    caption: '401 near Hwy 137',
    lat: 1,
    long: 1
  },
  {
    id: 'ON',
    src: 'http://www.mtocdn.ca/english/traveller/compass/camera/pictures/OttaCamera/loc43.jpg',
    source: 'http://www.mto.gov.on.ca',
    name: 'Thousand Islands Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'NY',
    caption: '401 East of Reynolds Rd.',
    lat: 1,
    long: 1
  },
  {
    id: 'ON',
    src: 'http://www.mtocdn.ca/english/traveller/compass/camera/pictures/OttaCamera/loc44.jpg',
    source: 'http://www.mto.gov.on.ca',
    name: 'Thousand Islands Bridge',
    side: 'Canada',
    province: 'ON',
    state: 'NY',
    caption: 'Hwy 137 near Thousand Islands Parkway',
    lat: 1,
    long: 1
  },
  {
    id: 'AB01',
    src: 'http://511.alberta.ca/cameras/imgs/4-02b_1.jpg',
    source: 'https://www.alberta.ca',
    name: 'Sweet Grass',
    side: 'Canada',
    province: 'AB',
    state: 'MO',
    caption: 'Hwy 4 at Rd.20, near Coutts and the border, looking north',
    lat: 1,
    long: 1
  },
  {
    id: 'AB04',
    src: 'http://511.alberta.ca/cameras/imgs/4-02a_1.jpg',
    source: 'https://www.alberta.ca',
    name: 'Sweet Grass',
    side: 'Canada',
    province: 'AB',
    state: 'MO',
    caption: 'Hwy 4 at Rd.40 near Warner, looking north',
    lat: 1,
    long: 1
  },
  // {
  //   id: 'AB02',
  //   src: 'http://rwis.mdt.mt.gov/ScanWeb/Wx/images/Vid-000629001-00-03-2018-02-01-21-50.jpg',
  //   source: 'http://rwis.mdt.mt.gov',
  //   name: 'Sweet Grass',
  //   side: 'US',
  //   province: 'AB',
  //   state: 'MO',
  //   caption: 'I-15 south of Sweet Grass, looking north',
  //   lat: 1,
  //   long: 1
  // },
  // {
  //   id: 'AB03',
  //   src: 'http://rwis.mdt.mt.gov/ScanWeb/Wx/images/Vid-000629001-00-00-2018-02-01-21-35.jpg',
  //   source: 'http://rwis.mdt.mt.gov',
  //   name: 'Sweet Grass',
  //   side: 'US',
  //   province: 'AB',
  //   state: 'MO',
  //   caption: 'I-15 south of Sweet Grass, looking south',
  //   lat: 1,
  //   long: 1
  // }
];

export default trafficCamArray;