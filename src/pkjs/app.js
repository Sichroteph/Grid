var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);


Pebble.addEventListener('ready', function(e) {
  Pebble.sendAppMessage({'JSReady': 1});
});

Pebble.addEventListener('appmessage', function(e) {
  var locationOptions = {'timeout': 15000, 'maximumAge': 60000};
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
});

function fetchWeather(latitude, longitude) {
  var settings = {};
  var units = 'f';

  try {
    settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
    units = unitsToString(settings.WeatherIsFahrenheit);
  } catch (e) {}


  var url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition, ' +
      'item.forecast from weather.forecast(1) where woeid in ' +
      '(select woeid from geo.places(1) where ' +
      'text=\'(' + latitude + ',' + longitude + ')\') and ' +
      'u=\'' + units + '\'&format=json';
  console.log('url: ' + url);


  xhrRequest(encodeURI(url), 'GET',
             function(responseText) {
               var json = JSON.parse(responseText);

               if (json.query.results==null){
                 var data = {
                   'WeatherTemperature': 999,
                   'WeatherIcon': 48,
                   'WeatherIconForecast': 48,
                   'WeatherLow' : 999,
                   'WeatherMax' : 999
                 };
               }

               else {
                 var item = json.query.results.channel.item;
                 var data = {
                 
                   
                   'WeatherTemperature': parseInt(item.condition.temp),
                   'WeatherIcon': parseInt(item.condition.code),
                   
                   'WeatherIconForecast': parseInt(item.forecast.code),
                   'WeatherLow' : parseInt(item.forecast.low),
                   'WeatherMax' : parseInt(item.forecast.high)

                 };
               }

               Pebble.sendAppMessage(data);
             }         
            );
}

function locationSuccess(pos) {
  fetchWeather(pos.coords.latitude, pos.coords.longitude);
}

function locationError(err) {

  Pebble.sendAppMessage({
    'WeatherTemperature': 999,
    'WeatherIcon': 48,
    'WeatherIconForecast': 48,
    'WeatherLow' : 999,
    'WeatherMax' : 999

  });
}

function unitsToString(unit) {
  if (unit) {
    return 'f';
  }
  return 'c';
}

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};