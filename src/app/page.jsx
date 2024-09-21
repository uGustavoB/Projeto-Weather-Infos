'use client';

import React from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AnimatePresence, motion } from 'framer-motion';
import WeatherCard from '@/components/WeatherCard';
import Notification from '@/components/Notification';
import Favorites from '@/components/Favorites';

const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/"
});

export default function Page() {
  const [posts, setPosts] = React.useState([]); // Agora um array para armazenar múltiplos cards
  const [inputVal, setInputVal] = React.useState('');
  const [city, setCity] = React.useState('');
  const [showWeatherCard, setShowWeatherCard] = React.useState(false);
  const [notificationsVisible, setNotificationsVisible] = React.useState(false)
  const [favoritesVisible, setFavoritesVisible] = React.useState(false); // inutil até implementar supabase
  
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  React.useEffect(() => {
    async function getPost() {
      try {
        const url = `weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const response = await client.get(url);

        if (response.data.cod === 404) {
          handleError('Cidade não encontrada')
          setShowWeatherCard(false);
        } else {
          setPosts(prevPosts => [...prevPosts, response.data]); // Adiciona a nova cidade ao array
          closeNotification()
          setShowWeatherCard(true);
        }
      } catch (error) {
        console.log('Erro ao fazer a requisição:', error);
        handleError('Cidade não encontrada')
        setShowWeatherCard(false);
      }
    }

    if (city) {
      getPost();
    }
  }, [city]);

  const handleError = (message) => {
    setNotificationsVisible(message)
  }

  const closeNotification = () => {
    setNotificationsVisible('')
  }

  //  AQUI VAI OS CODIGOS PARA CARREGAR OS FAVORITOS

  // React.useEffect(() => {
  //   // Vai carregar todos os favoritos que estiverem no supabase

  //   // setFavorites(local)
  // })
  // React.useEffect(() => {
  //   // Atualiza supabase sempre que favoritos mudarem

  // }, [favorites])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal === '') {
      handleError('Digite alguma cidade.')
      return;
    }
    setCity(inputVal);
    setInputVal(''); // Limpa o campo de input após o submit
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

      <div className='weather-box'>
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0 , scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Notification
        message={notificationsVisible}
        duration={3000}
        onClose={closeNotification}
      />
    </section>
  );
}
