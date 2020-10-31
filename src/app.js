const express= require("express")
const path =require("path")
const hbs = require("hbs")
const request=require("request")
const {geocode,forecast} = require("./utils/utils.js")

//paths for Express config
const viewPath= path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"../templates/partials")
app=express()

app.set("view engine", "hbs")
app.set("views", viewPath)

//Set up static directory to serve static html
app.use(express.static(publicDirectoryPath))

//initialize partials
hbs.registerPartials(partialsPath)


app.get("", (req, res)=>{
  res.render('index.hbs',{
    title: "Weather App", creator: "Renju Abraham"
  })
})

app.get("/about", (req, res)=>{
  res.render("about", {
    title: "About Me",
    creator: "Renju Abraham"
  })
})

app.get("/help", (req, res)=>{
  res.render("help", {
    title: "Help",
    creator: "Renju Abraham"
  })
})


app.get("/weather", (req,res)=>{
  let requestedinfo;
  if(!req.query.address)
  {
    return res.send({
      error:"No parameters entered. Please enter the place you want to search for."
    })
  }
  
  //make geocode request and forecast request
  geocode(req.query.address,(error,geocoordinates={})=>{
    if(error===undefined){
      //console.log(geocoordinates)
      forecast(geocoordinates[1].toString(), geocoordinates[0].toString(),(error,weatherinfo)=>{
        if(error ===undefined){
        res.send({
          place,
          region,
          temperature, 
          weatherforecast
        }=weatherinfo)
        }
        else{
          console.log(error)
        }
      })
    }
    else
    console.log(error)
  
  })
  

  // res.send(
  //  { requestedinfo
  //   // place: requestedinfo.place,
  //   // forecast: requestedinfo.forecast
  //  })
  
})

app.get("/help/*",(req,res)=>{
  res.render("error", {
    title:"404",
    errorMessage:"Help article not found"
  })
})

app.get("*", (req,res)=>{
  res.render("error",{
    title:"404",
    errorMessage: "Page Not Found..."
  })
})



app.listen(3000, ()=>{
  console.log("Webserver started on port 3000")
})



console.log(__dirname)
