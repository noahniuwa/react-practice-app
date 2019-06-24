import React from 'react';
import './App.css';
import Loader from 'react-loader'
const fetch = require("node-fetch")

let cities = {
  "Beijing Shi": "2038349",
  "Shanghai": "1796236",
  "Chengdu": "1815286",
  "Tokyo": "1850147",
  "New York": "5128638",
}
const proxy = "https://cors-anywhere.herokuapp.com/"
const baseUrl = "api.openweathermap.org/data/2.5/forecast?id="
const apiKey = "&appid=45c646d31cfd97308889a2add1005b9d"
let startingUrl = proxy + baseUrl + cities["Shanghai"] + apiKey

class App extends React.Component {
  constructor(){
    super()
    this.state={
      city: "loading",
      country: "loading",
      temperature: "loading",
      forecast: "loading",
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
        <div className="App">
            <div id="weatherContainer">
              <h1>Weather App</h1>
              <div><span className="infoItem">City: </span>{this.state.city}</div>
              <div><span className="infoItem">Country: </span>{this.state.country}</div>
              <div><span className="infoItem">Temperature: </span>{this.state.temperature}</div>
              <div><span className="infoItem">Forecast: </span>{this.state.forecast}</div>
  
  
            </div>
            <div id="citySelector">
            <label>
              <select 
                value={this.state.city} 
                onChange={this.handleLocationChange}
              >
                <option value="Shanghai">Shanghai</option>
                <option value="New York">New York</option>
                <option value="Chengdu">Chengdu</option>
                <option value="Beijing Shi">Beijing</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </label>
            
            </div>
        </div>
      );
    }
    else {
      return (
      <Loader />
      )
    }
    
  }
  
}

export default App;
