// MiniCard.jsx
import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState(sun);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) setIcon(cloud);
      else if (iconString.toLowerCase().includes('rain')) setIcon(rain);
      else if (iconString.toLowerCase().includes('clear')) setIcon(sun);
      else if (iconString.toLowerCase().includes('thunder')) setIcon(storm);
      else if (iconString.toLowerCase().includes('fog')) setIcon(fog);
      else if (iconString.toLowerCase().includes('snow')) setIcon(snow);
      else if (iconString.toLowerCase().includes('wind')) setIcon(wind);
    }
  }, [iconString]);

  const weekday = new Date(time).toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="flex flex-col gap-4 glassCard p-4 items-center">
      <div>{weekday}</div>
      <img src={icon} alt="weather_icon" className="w-[4rem]" />
      <div className="font-semibold">{temp} &deg;C</div>
    </div>
  );
};

export default MiniCard;
