'use client';

import React from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import WeatherCard from '@/components/WeatherCard';

const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/"
});

export default function Page() {
  const [post, setPost] = React.useState(null);
  const [inputVal, setInputVal] = React.useState('');
  const [city, setCity] = React.useState('');
  const [showWeatherCard, setShowWeatherCard] = React.useState(false);
  

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  React.useEffect(() => {
    async function getPost() {
      try {
        const url = `weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const response = await client.get(url);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        
      }
    }

    getPost();
  }, [city]); // Agora a requisição depende do estado 'city'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal === '') {
      document.querySelector('.submit-warning').textContent = 'Digite o nome de uma cidade!';
      return;
    }
    setCity(inputVal);
    setShowWeatherCard(true);
  };

  return (
    <section className="container">
      <div className="city-box">
        <h1>Digite o nome de uma cidade:</h1>
        <div className="input-box">
          <i className="bi bi-geo-alt-fill btn-geo"></i>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="input-cidade" 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)} 
            />
            <button type="submit" className="btn-submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <p className="submit-warning"></p>
        </div>
      </div>
      {showWeatherCard && post && <WeatherCard post={post} />}
    </section>
  );
}
