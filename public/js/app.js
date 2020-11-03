console.log("from the client side javascript file")
const form = document.querySelector("form")
const cityname = document.querySelector("input")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  fetch("/weather?address=" + cityname.value).then((response) => {
    response.json().then((data) => {

      //console.log(data)
      const forecast = document.querySelector("#forecast")
      const temperature = document.querySelector("#temperature")
      const place = document.querySelector("#place")
      const humidity=document.querySelector("#humidity")
      const feelslike = document.querySelector("#feelslike")
      place.textContent = data.place
      temperature.textContent = "Temperature is "+data.temperature
      forecast.textContent= data.weatherforecast
      humidity.textContent= "Humidity is " + data.humidity
      feelslike.textContent = "Feels like "+ data.feelslike
    })
  })
})

