import { createMarkup } from './helpers.js'; // Importa a função createMarkup

// Aqui está salvando a lista de favoritos no localstorage
export function saveFavorites(cities) {
  localStorage.setItem('favorites', JSON.stringify(cities));
}

// Aqui recupera a lista de favoritos do localStorage
export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Adicionando uma cidade na lista de favoritos ç.ç
export function addToFavorites(city) {
  let favorites = getFavorites();
  if (!favorites.some(favorite => favorite.name === city.name)) {
    if (favorites.length >= 8) {
      favorites.shift(); // Remove a cidade mais antiga se a lista estiver cheia
    }
    favorites.push(city);
    saveFavorites(favorites);
    // Atualiza a aba de favoritos, se visível
    if (document.querySelector('.favorites-box').style.display === 'block') {
      renderFavorites(); 
    }
  }
}

// Remove uma cidade dos favoritos
export function removeFromFavorites(cityName) {
  let favorites = getFavorites();
  favorites = favorites.filter(city => city.name !== cityName);
  saveFavorites(favorites);
  // Atualiza a aba de favoritos, se visível
  if (document.querySelector('.favorites-box').style.display === 'block') {
    renderFavorites(); 
  }
}

export function renderFavorites() {
    const favoritesList = document.querySelector('.favorites-list ul');
    const favorites = getFavorites();
  
    // Renderiza a lista de cidades favoritas
    favoritesList.innerHTML = favorites.map(city => 
      `<li data-city="${city.name}">
         ${city.name}
         <i class="bi bi-star-fill" data-city="${city.name}"></i>
       </li>`
    ).join('');
  
    // evento de clique a cada ícone de estrela na lista de favoritos
    favoritesList.querySelectorAll('i').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const cityName = e.target.getAttribute('data-city');
        removeFromFavorites(cityName); // Remove a cidade dos favoritos
        renderFavorites(); // Atualiza a lista de favoritos
        document.querySelector(`.weather-card[data-city="${cityName}"] .btn-favorite i`).classList.remove('bi-star-fill'); // Atualiza o ícone de estrela no card
      });
    });
  
    // evento de clique a cada item da lista de favoritos
    favoritesList.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', (e) => {
        const cityName = e.target.getAttribute('data-city');
        // aqui exibe o card da cidade favorit
        displayFavoriteCity(cityName); 
      });
    });
  }
  
// Aqui exibe o card da cidade favorita cado não estiver exibido. Cuidado na implementação ç.ç
export function displayFavoriteCity(cityName) {
  const weatherBox = document.querySelector('.weather-box');
  const favorites = getFavorites();
  const city = favorites.find(city => city.name === cityName);

  if (city) {
    // Aqui está verificando se o card já existe
    if (!weatherBox.querySelector(`.weather-card[data-city="${city.name}"]`)) {
      const div = document.createElement('div');
      div.classList.add('weather-card');
      div.setAttribute('data-city', city.name);
      div.innerHTML = `
        ${createMarkup(city)}
        <button class="btn-favorite" data-city="${city.name}">
          <i class="bi bi-star-fill"></i> <!-- Ícone preenchido -->
        </button>
      `;
      weatherBox.appendChild(div);
    }
  } else {
    console.log(`Cidade ${cityName} não encontrada nos favoritos.`);
  }
}