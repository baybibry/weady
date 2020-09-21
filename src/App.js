import React, {useState} from 'react'
import './App.scss'
import { HiOutlineSearch } from "react-icons/hi"
import {motion} from 'framer-motion'
import {  WiStrongWind, WiHumidity, WiThermometer,
          WiSmallCraftAdvisory, WiRefreshAlt } from "react-icons/wi";

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState([{}])

  const search = async text => {
    if(text.key === "Enter" ){
      const datas = await fetch(`${process.env.REACT_APP_WEADY_BASE}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEADY_KEY}`)
      // const data = datas.json()
      .then(res => res.json())
      .then(data =>{
        setWeather(data)
      } )
      .catch(err => 'Place not found')
      // setQuery('')
      // setWeather(data)
    }
  }

  const dateBuilder = (d) => {

    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novmber", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div 
      className={`App ${(typeof weather.main != "undefined") ? weather.weather[0].icon.split('')[2] === 'd' ? 'day': 'night' : 'App'}`}
      >
      <motion.main 
        initial={{opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='Search City'
            onChange={ e => setQuery(e.target.value)}
            value ={query}
            onKeyPress={search}
          />

          <HiOutlineSearch className='search-icon'/>

        </div>

        {(typeof weather.main != "undefined") ? (
          <>
            <div className='location-box'>

              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>

              <div className='date'>
                {dateBuilder(new Date(weather.dt))}
              </div>

            </div>      

            <div className='weather-box'>

              <div className='temp'>

                <h2>{Math.round(weather.main.temp)} &deg;c</h2>

                <h1 className='weather-description'>
                  {weather.weather[0].description} 
                  <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt='weather icon'
                    className='weather-img'
                  />
                </h1>
              </div>
              
              <div className='flex-main'>
                <div className='flex-temp'>
                  <h2> Temperature <WiThermometer className='h2-icon-1'/> </h2> 
                  <h4>Feel like {Math.round(weather.main.feels_like)}&deg;c</h4>
                </div>

                <div className='flex-humidity'>
                  <h2> Humidity <WiHumidity className='h2-icon-2'/> </h2> 
                  <h4> {weather.main.humidity}% </h4>
                </div>

                <div className='flex-wind'>
                  <h2> Wind <WiStrongWind className='h2-icon-3'/> </h2>
                  <h4>Wind speed: {weather.wind.speed}<WiSmallCraftAdvisory/></h4>
                </div>
              </div>

            </div>
          </>
        ): (
          <i>
            Weady's photo
          </i>
        )}
        
      </motion.main>
    </div>
  );
}

export default App;
