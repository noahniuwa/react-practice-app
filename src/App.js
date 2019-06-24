import React from 'react';
import './App.css';
const fetch = require("node-fetch")

let cities = {
  beijing: "2038349",
  shanghai: "1796236",
  chengdu: "1815286",
  tokyo: "1850147",
  newYork: "5128638",
}
const proxy = "https://cors-anywhere.herokuapp.com/"
const baseUrl = "api.openweathermap.org/data/2.5/forecast?id="
const apiKey = "&appid=45c646d31cfd97308889a2add1005b9d"
let startingUrl = proxy + baseUrl + cities.shanghai + apiKey

class App extends React.Component {
  constructor(){
    super()
    this.state={
      city: "loading",
      country: "loading",
      temperature: "loading",
      forecast: "loading",
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
      console.log(data)
      this.setState({
        city: data.city.name,
        country: data.city.country,
        temperature: Math.floor(data.list[0].main.temp - 272.15),
        forecast: data.list[0].weather[0].description,
      })
    })
  }

  componentDidMount(){
    this.getWeather(startingUrl)
  }

  handleLocationChange(event) {
    this.setState({
      city: "loading",
      country: "loading",
      temperature: "loading",
      forecast: "loading",
    });
    this.getWeather(this.buildUrl(cities[event.target.value]))
  }

  render(){
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
          <select 
            value={this.state.city} 
            onChange={this.handleLocationChange}
          >
            <option value="shanghai">Shanghai</option>
            <option value="newYork">New York</option>
            <option value="chengdu">Chengdu</option>
            <option value="beijing">Beijing</option>
          </select>
          </div>
      </div>
    );
  }
  
}

export default App;
