import { useState } from 'react'
import axios from 'axios'
function App() {
  const [value, setValue] = useState('')
  const [data, setData] = useState({})
  const APIKEY = '8d7a2b8b5628c8577c68d62dee92cb77'
  const url = `https://api.weatherstack.com/current?access_key=${APIKEY}&query=${value}`
  const searchfun = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) =>{
        console.log(response.data);
        setData(response.data)
        
      })
      setValue('')
    }
  }
  let weather;
  if (data.current){
    weather = data.current.weather_descriptions;
  }
  else{
    weather = null;
  }
  if (Array.isArray(weather)) {
    weather = weather[0]; 
  }
  
  switch(weather){
    case 'Partly cloudy':
    case 'Cloudy':
        weather = 'cloudy';
        break;
    case 'Sunny':
    case 'Clear':
        weather = 'sunny';
        break;
    default:
        weather = 'none'
        break;
  }

  const background = {
    backgroundImage: `url(/src/assets/${weather}.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

  };
  return (
    <>
      <div className="container" style={background}>
        <div className="container__inner">
          <div className="top">
            <input 
            value={value}
            type="text" 
            placeholder='enter city'
            onChange={event => setValue(event.target.value)}
            onKeyPress={searchfun}
            />
          </div>
          <div className="center">
            <div className="center__icon">
              <img src="" alt="" />
            </div>
            <div className="center__name">
              {data.location ? <h1>{data.location.name}</h1> : 'Enter city name'}
            </div>
            <div className="center__discription">
            {data.current ? <p>{data.current.weather_descriptions}</p> : "discription weather"}
            </div>
          </div>
          <div className="bottom">
            <div className="temp">
            

              <p>temp:{data.current ? <span>{data.current.temperature} ℃ </span>: 'temperature'}</p>
            </div>
            <div className="w_speed">
                <p className='bold'>{data.current ? data.current.wind_speed : 'win speed'} mph</p>
            </div>
          </div>			
        </div>

      </div>
    </>
  )
}

export default App
