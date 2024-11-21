import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState('Jaipur');
  const [thisLocation, setLocation] = useState('');

  const fetchWeather = async () => {
    if (!place || place.trim() === '') {
      alert('Please enter a valid city name');
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      params: {
        q: place,
        units: 'metric',
        appid: apiKey
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data;

      if (!data || !data.city) {
        alert('City not found');
        setWeather({});
        setValues([]);
        return;
      }

      setLocation(data.city.name);
      setWeather({
        temp: data.list[0].main.temp,
        humidity: data.list[0].main.humidity,
        wspd: data.list[0].wind.speed,
        conditions: data.list[0].weather[0].main,
        heatindex: data.list[0].main.feels_like
      });
      setValues(data.list.slice(0, 7).map(item => ({
        datetime: item.dt_txt,
        temp: item.main.temp,
        conditions: item.weather[0].main
      })));
    } catch (e) {
      console.error('Error fetching weather data:', e);
      alert('This place does not exist');
      setWeather({});
      setValues([]);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
