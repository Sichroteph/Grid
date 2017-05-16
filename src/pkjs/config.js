module.exports = [
  {
    "type": "heading",
    "defaultValue": "GridHR Configuration"
  },
  {
    "type": "text",
    "defaultValue": "<h6>A white button = OFF, an orange button = ON</h6>",
  },


  {
    "type": "section",
    "items": [		
      {
        "type": "heading",
        "defaultValue": "<h5>Display</h5>"
      },	

      {
        "type": "toggle",
        "messageKey": "WeatherIsFahrenheit",
        "label": "Celcius (off), Fahrenheit (on)",
        "defaultValue": true
      }
    ]
  },	


  {
    "type": "section",
    "items": [	
      {
        "type": "heading",
        "defaultValue": "<h6>Vibration</h6>"
      },
      {
        "type": "toggle",
        "messageKey": "bluetoothvibe",
        "label": "Bluetooth",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "hourlyvibe",
        "label": "Each hour",
        "defaultValue": false
      },
    ]
      },


      {
      "type": "text",
      "defaultValue": "<h6>Please consider making a <a href='https://www.paypal.me/markchopsreed'>small donation here</a>, if you find this watchface useful. Thankyou.</h6>",
      },
      {
      "type": "submit",
      "defaultValue": "Save Settings"
      }
    ];