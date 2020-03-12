import React from 'react'
import Loader from 'react-loader'
import locations from '../locations.json'


const fetch = require('node-fetch')

const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'api.openweathermap.org/data/2.5/forecast?id='
const apiKey = '&appid=45c646d31cfd97308889a2add1005b9d'//process.env.REACT_APP_API_KEY
let startingUrl = proxy + baseUrl + '5128581' + apiKey

class WeatherApp extends React.Component {
  constructor(){
    super()
    this.state={
      city: 'loading',
      country: 'loading',
      temperature: 'loading',
      forecast: 'loading',
      ready: false,
      input: '',
      locationId: '',
      location: '',
      locationQueryResults: [],
    }
    this.getWeather = this.getWeather.bind(this)
    this.buildUrl = this.buildUrl.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleCityClick = this.handleCityClick.bind(this)
    // this.handleLocationSubmit = this.handleLocationSubmit.bind(this)
  }
  
  buildUrl(cityCode){
    return proxy + baseUrl + cityCode + apiKey
  }

  handleLocationChange(event) {
    let location = event.target.value
    let queryString = `^${event.target.value}`
    this.setState({location: location})
    let regex = new RegExp(queryString, 'gi')
    let filtered = locations.filter(place => {
      if (place.country) {
        return place.name.match(regex) || place.country.match(regex)
      }
      else {
        return place.name.match(regex)
      }
    })
    if (location.length > 0){
      this.setState({locationQueryResults: filtered.slice(0,15)})
    }
    else {
      this.setState({locationQueryResults: []})
    }
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

  handleCityClick(event){
    this.setState({ready: false})
    this.getWeather(this.buildUrl(event.target.id))
  }

  componentDidMount(){
    this.getWeather(startingUrl)
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
        
          <form onSubmit={this.handleLocationSubmit}>
            <input className='input' type='text' value={this.state.location} onChange={this.handleLocationChange}>
            </input>
            {/* <input type='submit' ></input> */}
          </form>
          <div className='results'>
            {this.state.locationQueryResults.map(result => {
              return <p className='location' onClick={this.handleCityClick} id={result.id} key={result.id}>{result.name}, {result.state !== '' ? `${result.state},` : ''} {result.country}</p>
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='WeatherApp one-edge-shadow'>
          <div id='weatherContainer'>
            <h1>Weather App</h1>
            <div><span className='infoItem'>City: </span>Loading...</div>
            <div><span className='infoItem'>Country: </span>Loading...</div>
            <div><span className='infoItem'>Temperature: </span>Loading...</div>
            <div><span className='infoItem'>Forecast: </span>Loading...</div>
            <Loader />
          </div>
        
          <form onSubmit={this.handleLocationSubmit}>
            <input className='input' type='text' value={this.state.location} onChange={this.handleLocationChange}>
            </input>
            {/* <input type='submit' ></input> */}
          </form>
          <div className='results'>
            {this.state.locationQueryResults.map(result => {
              return <p className='location' onClick={this.handleCityClick} id={result.id} key={result.id}>{result.name}, {result.state !== '' ? `${result.state},` : ''} {result.country}</p>
            })}
          </div>
        </div>
      )
    }
  }
  
}

export default WeatherApp