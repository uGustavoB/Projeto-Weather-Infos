import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Favorites = ({ favorites, removeFromFavorites, displayFavoriteCity, isVisible, toggleVisibility }) => {
  useEffect(() => {
    // Qualquer efeito necessário ao renderizar os favoritos
  }, [favorites]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="favorites-box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'spring',
        bounce: 0.5,
        duration: 0.7
      }}
    >
      <button className="btn-hide" onClick={toggleVisibility}>
        <i className="bi bi-x-circle"></i>
      </button>
      <h2>Favoritos</h2>
      <div className="favorites-list">
        <ul>
          {favorites.map(city => (
            <li key={city} data-city={city}>
              <span onClick={() => displayFavoriteCity(city)}>{city}</span>
              <i className="bi bi-star-fill" onClick={() => removeFromFavorites(city)}></i>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Favorites;
