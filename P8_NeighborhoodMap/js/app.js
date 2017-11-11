"use strict";

const AppViewModel = function() {
  // hard-coded locations interested
  this.locations = ko.observableArray([{
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

// filterLocations shows all locations or those match the user input
AppViewModel.prototype.filterLocations = function(data, evt) {
  const locations = this.locations.removeAll();
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
  markers.forEach(function(marker) {
    if (marker.title === location.name) {
      showInfoWindow(marker);
    }
  });
};

// start bouncing the marker
AppViewModel.prototype.startBounce = function(location, evt) {
  evt.target.classList.add('active');
  markers.forEach(function(marker) {
    if (marker.title === location.name) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
};

// stop bouncing the marker
AppViewModel.prototype.stopBounce = function(location, evt) {
  evt.target.classList.remove('active');
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

// displayMarkers shows all markers for locations above, it uses Google geo code
// API to get the corresponding latitude/longitude data respectively
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
        marker.addListener('click', function() {
          showInfoWindow(marker);
        });
        markers.push(marker);
      }).catch(function(e) {
        alert(e);
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

// showInfoWindow shows some information for the location using He Feng Weather API
function showInfoWindow(marker) {
  map.setCenter(marker.getPosition());
  const weatherAPI = 'https://free-api.heweather.com/s6/weather/lifestyle?location=%E6%9D%AD%E5%B7%9E&key=491604eb519d4a39a6fc678246d49a7f';
  const infoWindow = new google.maps.InfoWindow();
  fetch(weatherAPI).then(function(response) {
    return response.json();
  }).then(function(weatherData) {
    console.log(weatherData);
    if (weatherData.HeWeather6[0].status === 'ok') {
      const province = weatherData.HeWeather6[0].basic.admin_area;
      const city = weatherData.HeWeather6[0].basic.location;
      const updateTime = weatherData.HeWeather6[0].update.loc;
      const comfortIndex = weatherData.HeWeather6[0].lifestyle[0].brf;
      const dressIndex = weatherData.HeWeather6[0].lifestyle[1].brf;
      const travelIndex = weatherData.HeWeather6[0].lifestyle[4].brf;
      const airIndex = weatherData.HeWeather6[0].lifestyle[7].brf;
      const contentString = `<div class="card" style="width: 20rem;">
  <div class="card-body">
    <h4 class="card-title">${province}${city} - ${marker.title}</h4>
    <p class="card-text">更新时间： ${updateTime}</p>
    <p class="card-text">舒适指数：${comfortIndex}</p>
    <p class="card-text">穿衣指数：${dressIndex}</p>
    <p class="card-text">旅游指数：${travelIndex}</p>
  </div>
</div>`;
      infoWindow.setContent(contentString);
      infoWindow.open(map, marker);
    } else {
      const invalid = `<p>Invalid status: ${weatherData.HeWeather6[0].status}</p>`;
      infoWindow.setContent(invalid);
      infoWindow.open(map, marker);
    }
  }).catch(function(e) {
    const err = `<p>Error: ${e}</p>`;
    infoWindow.setContent(err);
    infoWindow.open(map, marker);
  });
}
