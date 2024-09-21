// components/Favorites.js
import React, { useEffect } from 'react';

const Favorites = ({ favorites, removeFromFavorites, displayFavoriteCity, isVisible, toggleVisibility }) => {
  useEffect(() => {
    // Qualquer efeito necessário ao renderizar os favoritos
  }, [favorites]);

  if (!isVisible) return null;

  return (
    <div className="favorites-box">
      <button className="btn-hide-favorites" onClick={toggleVisibility}>
        <i className="bi bi-x-circle"></i>
      </button>
      <h2>Favoritos</h2>
      <div className="favorites-list">
        <ul>
          {favorites.map(city => (
            <li key={city.name} data-city={city.name}>
              <span onClick={() => displayFavoriteCity(city.name)}>{city.name}</span>
              <i className="bi bi-star-fill" onClick={() => removeFromFavorites(city.name)}></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
