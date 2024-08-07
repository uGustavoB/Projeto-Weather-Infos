import { checkForErrors, createMarkup } from './helpers.js';  

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

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=pt_br`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (checkForErrors(inputVal, data, this.cities, this.warning)) {
            this.warning.style.display = 'block';
            return;
          }

          this.warning.style.display = 'none';
          this.cities.push(data);

          
          this.renderWeatrerCards();
          
          
          this.form.reset();
        });
    });
  }
  
  renderWeatrerCards() {
    // Limpar o conteúdo do cartão de clima anterior. Não implementei para não afetar a implementação do localStorage
    // Se for implementar, podemos fazer com o map também
    //this.weatherBox.innerHTML = '';

    this.weatherBox.innerHTML = this.cities.map(city => {
      const div = document.createElement('div');
      div.classList.add('weather-card');
      div.innerHTML = createMarkup(city);
      return div.outerHTML;
    })
    .join('');
  }
}