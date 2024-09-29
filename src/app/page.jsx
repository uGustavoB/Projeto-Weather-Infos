'use client';

import React from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AnimatePresence, motion } from 'framer-motion';
import WeatherCard from '@/components/WeatherCard';
import Notification from '@/components/Notification';
import Favorites from '@/components/Favorites';
import EmailModal from '@/components/EmailModal';
import supabase from './supabaseClient';

const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/"
});

export default function Page() {
  const [posts, setPosts] = React.useState([]); // Agora um array para armazenar múltiplos cards
  const [inputVal, setInputVal] = React.useState('');
  const [city, setCity] = React.useState('');
  const [showWeatherCard, setShowWeatherCard] = React.useState(false);
  const [notificationsVisible, setNotificationsVisible] = React.useState(false)
  const [favoritesVisible, setFavoritesVisible] = React.useState(false);

  const [favorites, setFavorites] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  
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

  const validateCityName = (name) => {
    const cityRegex = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
    if (!cityRegex.test(name)) {
      return false;
    }
    return true
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCityName(inputVal)) {
      handleError('Nome da cidade inválida');
      return;
    }
    if (inputVal === '') {
      handleError('Digite alguma cidade.')
      return;
    }
    setCity(inputVal);
    setInputVal(''); // Limpa o campo de input após o submit

  };

  const fetchFavorites = async () => {
    if (!email) {
      setShowModal(true);
      return;
    }

    const { data, error } = await supabase
      .from('citiesFav')
      .select('city_name')
      .eq('email', email);

      if (error) {
        console.log('Erro ao buscar favoritos:', error);
        handleError('Erro ao buscar favoritos.')
        return;
      } else {
        setFavorites(data);
      }
  }

  const addToFavorites = async (city) => {
    if (!email) {
      setShowModal(true);
      return;
    }

    let { data: user, error: errorUser } = await supabase
      .from('user')
      .select('email')
      .eq('email', email);

    if (user.length === 0) {
      const { data, error } = await supabase
      .from('user')
      .insert([{ email }]);
    }
    const {data: data2, error: error} = await supabase
      .from('citiesFav')
      .insert([{ email, city_name: city.name }]);

    if (error) {
      console.log('Erro ao adicionar favorito:', error);
      handleError('Erro ao adicionar favorito.')
      return;
    } else {
      fetchFavorites();
    }
  }

  const removeFromFavorites = async (city) => {
    const { data, error } = await supabase
      .from('citiesFav')
      .delete()
      .eq('email', email)
      .eq('city_name', city);

    if (error) {
      console.log('Erro ao remover favorito:', error);
      handleError('Erro ao remover favorito.')
      return;
    } else {
      fetchFavorites();
    }
  }

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setShowModal(false);
    fetchFavorites();
  }

  const checkIfFavorite = (city) => {
    return favorites.some(fav => fav.city_name === city);
  }

  const favoritesVisibility = () => {
    if (!email) {
      setShowModal(true);
      return;
    }
    setFavoritesVisible(!favoritesVisible);
    fetchFavorites();
  }

  const favoritesList = () => {
    return favorites.map(fav => fav.city_name);
  }

  const toggleFavorites = (name) => {
    const cityInFavorites = favorites.some(fav => fav.city_name === name);

    if (cityInFavorites) {
      removeFromFavorites(name);
    }
    else {
      const city = posts.find(post => post.name === name);
      if (city) {
        addToFavorites(city);
      }
    }
  }

  return (
    <section className="container">
      <button className="btn-favorites"
        data-city="${city.name}"
        onClick={() => favoritesVisibility(!favoritesVisible)}
      >
          <i className="bi bi-star-fill"></i>
      </button>
      <EmailModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleMail={handleEmailSubmit}
      />
      <Favorites
        favorites={favoritesList()}
        removeFromFavorites={removeFromFavorites}
        displayFavoriteCity={setCity}
        isVisible={favoritesVisible}
        toggleVisibility={() => favoritesVisibility(!favoritesVisible)}
      />
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
              <WeatherCard
              post={post}
              add={addToFavorites}
              remove={removeFromFavorites}
              check={checkIfFavorite}
              toggleFavorites={() => toggleFavorites(post.name)}
              />
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
