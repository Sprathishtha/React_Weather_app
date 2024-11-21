import React, { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg'; 
import { useStateContext } from './Context'; // Assuming you have a context provider
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'; // Assuming these components are defined

function App() {
  const [input, setInput] = useState('');
  const { weather, values, place, setPlace, error, fetchWeather } = useStateContext();
  const [loading, setLoading] = useState(true);

  const submitCity = () => {
    if (input.trim() === '') {
      alert('Please enter a valid city name.');
      return;
    }
    setPlace(input);
    setInput('');
  };

  useEffect(() => {
    if (weather !== null) {
      setLoading(false);  
    }
  }, [weather]);

  const getNextDays = () => {
    const days = [];
    const today = new Date().getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = today + 1; i <= today + 6; i++) {
      const nextDayIndex = i % 7;
      days.push(dayNames[nextDayIndex]);
    }
    
    return days;
  };

  const nextDays = getNextDays();

  return (
    <div className="w-full h-screen text-white px-8 relative">
      <BackgroundLayout />
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-[15rem] p-2 flex items-center rounded-lg">
          <input
            className="flex-1 outline-none px-4 bg-transparent text-black"
            placeholder="Enter city name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img
            src={search}
            alt="search"
            className="cursor-pointer w-10 h-10 ml-[-35px]"
            onClick={submitCity}
          />
        </div>
      </nav>

      <div className="flex flex-row justify-center items-start gap-10 w-full mt-16">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <WeatherCard
            className="w-[350px] h-[400px]" 
            temperature={weather.temp}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            place={place}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />
        )}

        <div className="grid grid-cols-3 gap-6">
          {nextDays.map((day, index) => (
            <MiniCard
              key={index}
              className="w-[150px] h-[180px]"
              time={day}  // Display the day name
              temp={values[index]?.temp || "N/A"} // Use optional chaining and provide a fallback
              iconString={values[index]?.conditions || "N/A"} // Use optional chaining and provide a fallback
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;