class Weather {
  constructor () {
    this.form = document.querySelector('.form');
    this.warning = document.querySelector('.submit-warning');
    this.weatherBox = document.querySelector('.weather-box');
    this.cities = [];
  }

  init () {
    this.submitForm();
  }

  checkErrors (inputVal, data) {
    if (inputVal === '') {
      this.warning.innerText = 'Input vazio, digite uma cidade.';
      return true;
    }
    if (data.cod === '404') {
      this.warning.innerText = 'Cidade não encontrada!';
      return true;
    }
    this.cities.forEach(city => {
      if (data.name === city.name || data.weather[0].main === city.weather[0].main) {
        if (city.main.temp === data.main.temp) {
          this.warning.innerText = 'Cidade já está na página;';
          return true;
        }
      }
    });
  }

  submitForm () {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      const apiKey = '8f8c6a4b319c79cc99231b7f6c114d37';

      const inputVal = this.form.querySelector('.input-cidade').value;

      // Checar se valor do input é vazio
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=pt_br`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { main, name, weather, wind, sys } = data;
          if (this.checkErrors(inputVal, data)) {
            this.warning.style.display = 'block';
            return true;
          }
          this.warning.style.display = 'none';
          this.cities.push(data);

          console.log(this.cities);
          const div = document.createElement('div');
          this.weatherBox.insertAdjacentElement('afterbegin', div);
          div.classList.add('weather-card');

          const markup = `
            <h2>${name} <sup>${sys.country}</sup></h2>
            <h1>${Math.round(main.temp)}<sup>°C</sup></h1>
            <img src="assets/img/${weather[0].main}.svg" alt="" class="weather-img"><br />
            <div class="weather-details">
              <div class="humidity">
                <i class="bi bi-water"></i>
                <div class="text">
                  <span>${main.humidity}</span>
                  <p>Humidade</p>
                </div>
              </div>
              <div class="wind">
                <i class="bi bi-wind"></i>
                <div class="text">
                  <span>${wind.speed}</span>
                  <p>Velocidade</p>
                </div>
              </div>
            </div>
          `;
          div.innerHTML = markup;
          this.form.reset();
        });
    });
  }
}

const weather = new Weather();
weather.init();
