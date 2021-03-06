import React from 'react'
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import About from './components/About'
import WeatherApp from './components/WeatherApp'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function AppRouter(){
  return(
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>By Noah Maizels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Weather App</Nav.Link>
            <Nav.Link href="/about/">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact component={WeatherApp} />
      <Route path="/about/" component={About} />
    </Router>
  )
}

export default AppRouter
