const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geo = require("./utils/geo");
const port = process.env.PORT || 3000;

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thareja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Thareja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Thareja'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You Must Provide address"
        })
    }
    geo.geocode(req.query.address, (error,meme)=>{
        if(error){
            res.send({
                error: error
            })
        }
        else{
            geo.forecast(meme.lat,meme.lon,(error,data)=>{
                if(error){
                    res.send({
                        error:error
                    })
                }
                else{
                    res.send({
                        temp: data.temp,
                        region: data.region,
                        discription: data.desc[0],
                        latitude : meme.lat,
                        longitude: meme.lon,
                        country: data.country,
                        weatehrimg: data.weatherimg
                    })
                }
            })
            // res.send({
            //     lat: data.lat,
            //     lon:data.lon
            // })

        }
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})