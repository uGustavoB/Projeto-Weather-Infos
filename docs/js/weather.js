import { checkForErrors, createMarkup } from './helpers.js';  
import { addToFavorites, getFavorites, removeFromFavorites } from './favorites.js';

export class Weather { 
  constructor () {
    this.form = document.querySelector('.form');  
    this.warning = document.querySelector('.submit-warning');  
    this.weatherBox = document.querySelector('.weather-box');  
    this.cities = [];
  }

  init () {
    this.submitForm();
  }

  submitForm () {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      const apiKey = '8f8c6a4b319c79cc99231b7f6c114d37';
      const inputVal = this.form.querySelector('.input-cidade').value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=pt_br`; // Corrigido com crase

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (checkForErrors(inputVal, data, this.cities, this.warning)) {
            this.warning.style.display = 'block';
            return;
          }

          this.warning.style.display = 'none';
          this.cities.push(data);
          this.renderWeatherCards();
          this.form.reset();
        });
    });
  }
  
  renderWeatherCards() {
    // Aqui tá pegando as cidades favoritas
    const favorites = getFavorites(); 

    this.weatherBox.innerHTML = this.cities.map(city => {
      const isFavorite = favorites.some(fav => fav.name === city.name); // Verifica se a cidade é favorita
      return `
        <div class="weather-card" data-city="${city.name}">
          ${createMarkup(city)}
          <button class="btn-favorite" data-city="${city.name}">
            <i class="bi bi-star${isFavorite ? '-fill' : ''}"></i> <!-- Usa ícone de estrela preenchido se for favorita -->
          </button>
        </div>
      `;
    }).join('');

    this.weatherBox.querySelectorAll('.btn-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const cityName = e.target.closest('button').getAttribute('data-city');
        const city = this.cities.find(city => city.name === cityName);
        const isFavorite = favorites.some(fav => fav.name === cityName);

        if (city) {
          if (isFavorite) {
            removeFromFavorites(cityName); // Remove dos favoritos se já for favorito
          } else {
            addToFavorites(city); // Adiciona aos favoritos
          }
          this.renderWeatherCards(); // Re-renderiza os cards para atualizar o estado da estrela
        }
      });
    });
  }
}