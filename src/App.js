import React from 'react'
import './App.css'
import Loader from 'react-loader'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const fetch = require('node-fetch')

let cities = {
  'Beijing Shi': '2038349',
  'Shanghai': '1796236',
  'Chengdu': '1815286',
  'Tokyo': '1850147',
  'New York': '5128638',
}
const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'api.openweathermap.org/data/2.5/forecast?id='
const apiKey = '&appid=45c646d31cfd97308889a2add1005b9d'//process.env.REACT_APP_API_KEY
let startingUrl = proxy + baseUrl + cities['Shanghai'] + apiKey

function AppRouter(){
  return(
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Noah Maizels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Weather App</Nav.Link>
            <Nav.Link href="/about/">About</Nav.Link>
            <Nav.Link href="/docs/">WanDocs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact component={WeatherApp} />
      <Route path="/about/" component={About} />
      <Route path="/docs/" component={WanDocs} />
    </Router>
  )
}

class WeatherApp extends React.Component {
  constructor(){
    super()
    this.state={
      city: 'loading',
      country: 'loading',
      temperature: 'loading',
      forecast: 'loading',
      ready: false,
      
    }
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.buildUrl = this.buildUrl.bind(this)
  }
  
  buildUrl(cityCode){
    return proxy + baseUrl + cityCode + apiKey
  }

  getWeather(url){
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          city: data.city.name,
          country: data.city.country,
          temperature: Math.floor(data.list[0].main.temp - 272.15),
          forecast: data.list[0].weather[0].description,
          ready: true,
        })
      })
  }

  componentDidMount(){
    this.getWeather(startingUrl)
  }

  handleLocationChange(event) {
    this.setState({ready: false})
    this.getWeather(this.buildUrl(cities[event.target.value]))
  }

  render(){
    if (this.state.ready){
      return (
        <div className='WeatherApp one-edge-shadow'>
          <div id='weatherContainer'>
            <h1>Weather App</h1>
            <div><span className='infoItem'>City: </span>{this.state.city}</div>
            <div><span className='infoItem'>Country: </span>{this.state.country}</div>
            <div><span className='infoItem'>Temperature: </span>{this.state.temperature}&deg;C</div>
            <div><span className='infoItem'>Forecast: </span>{this.state.forecast}</div>

          </div>
          <div id='citySelector'>
            <label>
              <select 
                value={this.state.city} 
                onChange={this.handleLocationChange}
              >
                <option value='Shanghai'>Shanghai</option>
                <option value='New York'>New York</option>
                <option value='Chengdu'>Chengdu</option>
                <option value='Beijing Shi'>Beijing</option>
                <option value='Tokyo'>Tokyo</option>
              </select>
            </label>
            
          </div>
         
        </div>
      )
    }
    else {
      return (
        <Loader />
      )
    }
    
  }
  
}

function WanDocs(){
  return <iframe src="https://www.explorewanchain.org"></iframe>
}

function About(){
  return <h1>About</h1>
}

export default AppRouter
