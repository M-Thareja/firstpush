const { url } = require("inspector");
const request = require("request");




const forecast = (lat, lon, callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=40be3f64a20ca4e67bc0240fa0ab5fc7&query=${lat},${lon}`

    request({url : url, json : true}, (error, response)=>{
        if(error){
            callback("Server Error Can't Connect.",undefined);
        }
        else if(response.body.error){
            callback("Wrong Information", undefined);
        }
        else{
            callback(undefined, {
                temp : response.body.current.temperature,
                region : response.body.location.region,
                desc : response.body.current.weather_descriptions,
                country: response.body.location.country,
                weatherimg: response.body.current.weather_icons

            })
        }
    })

}

const geocode = (address, callback)=>{

    const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3VzdG1yNTU1MzU3IiwiYSI6ImNrdnJpbmNoMjA4Nmcyb205MGRrejFrNDQifQ.QTAPRhDrNyuN-zBae4E6Sg&limit=1`

    request({url : geourl, json: true}, (error, response)=>{
        if(error){
            callback("Servier Not Found.", undefined);
        }
        else if(response.body.features.length == 0){
            callback("Location Not Found.", undefined);
        }
        else{
            // const lat = body.features[0].center[1]
            // const lon = body.features[0].center[0]
            callback(undefined,{
                lat :response.body.features[0].center[1],
                lon :response.body.features[0].center[0]
            })
        }
    })
    
}

module.exports = {
    geocode : geocode,
    forecast : forecast
}