const request = require("request")

// function definition
const geocode = function (address, callback) {
  request({
    url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicmVuanVhIiwiYSI6ImNrZ2ZiY2Y2djBpMjUycXBmZDdxNWpmNjkifQ.3NkWkfHVmu9O6Xiq0QDMKw",
    json: true
  }, (error, {body}) => {
    if (error) {
      callback(error, undefined)
    }
    else {
      if(body.features.length==0)//doesn't work
      {
        //console.log(body)
        callback(undefined, ["0", "0"])
      }
      else{
      //console.log(body)
      callback(undefined, body.features[0].center)
    }
    }
  }
  )

}


const forecast = function (longitude, latitude, callback) {
  url = "http://api.weatherstack.com/current?access_key=e2476c96f0467fe886b128fa443af5ba&query=" + longitude + "," + latitude
  request({
    url,
    json: true
  }, (error, {body}) => {
    if(!error){
      //console.log(body)
    callback(undefined,{
      place: body.location.name,
      region: body.location.region,
      lattitude: body.location.lat,
      longitude: body.location.lon,
      temperature: body.current.temperature,
      weatherforecast: body.current.weather_descriptions[0],
      feelslike: body.current.feelslike,
      humidity: body.current.humidity,
      observationtime:body.current.observationtime
    })
    }
    else {
      callback("Something went wrong", undefined)
    }
  })

}

//Renju: Object property short-hand syntax
module.exports = {
  geocode,
  forecast
}

