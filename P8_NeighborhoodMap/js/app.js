
const AppViewModel = function() {
  this.locations = ko.observableArray([
    {
      name: '灵隐寺',
      visible: true,
    },
    {
      name: '北高峰',
      visible: true,
    },
    {
      name: '云溪竹径',
      visible: true,
    },
    {
      name: '钱江一桥',
      visible: true,
    },
    {
      name: '断桥残雪',
      visible: true,
    },
    {
      name: '台塑牛排',
      visible: true,
    },
    {
      name: '千串屋',
      visible: true,
    },
    {
      name: '柳浪闻莺',
      visible: true,
    },
    {
      name: '南宋御街',
      visible: true,
    },
    {
      name: '五云山',
      visible: true,
    },
    {
      name: '梅家坞',
      visible: true,
    },
    {
      name: '满觉陇',
      visible: true,
    },
    {
      name: '六和塔',
      visible: true,
    },
    {
      name: '曲院风荷',
      visible: true,
    },
    {
      name: '玉皇山',
      visible: true,
    },
    {
      name: '岳王庙',
      visible: true,
    }
  ]);
};

AppViewModel.prototype.filterLocations = function(data, evt) {
  locations = this.locations.removeAll();
  const self = this;
  locations.forEach(function(loc) {
    if (evt.target.value !== "") {
      if (loc.name.indexOf(evt.target.value) === -1) {
        loc.visible = false;
      } else {
        loc.visible = true;
      }
    } else {
      loc.visible = true;
    }
    self.locations.push(loc);
  });
  updateMarkers();
};

AppViewModel.prototype.showLocationInfo = function(location) {
  console.log(location);
};

AppViewModel.prototype.startBounce = function(location) {
  markers.forEach(function(marker) {
    if (marker.title === location.name) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
};

AppViewModel.prototype.stopBounce = function(location) {
  markers.forEach(function(marker) {
    if (marker.title === location.name) {
      marker.setAnimation(null);
    }
  });
};

const avm = new AppViewModel();

ko.applyBindings(avm);

let map;
const markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 30.2520798,
      lng: 120.1344447
    },
    zoom: 13
  });

  displayMarkers();
}

function displayMarkers() {
  const locations = avm.locations();
  locations.forEach(function(loc) {
    if (loc.visible) {
      const geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc.name + ',+杭州&key=AIzaSyDqKroCshxFO_T0WPX2Dhs2jhiWBfBKP1Q';
      fetch(geoCodeURL).then(function(response) {
        return response.json();
      }).then(function(data) {
        const marker = new google.maps.Marker({
          position: data.results[0].geometry.location,
          map: map,
          title: loc.name,
          animation: google.maps.Animation.DROP
        });
        markers.push(marker);
      });
    }
  });
}

function updateMarkers() {
  const locations = avm.locations();
  locations.forEach(function(location) {
    markers.forEach(function(marker) {
      if (location.name === marker.title) {
        location.visible ? marker.setMap(map) : marker.setMap(null);
      }
    });
  });
}
