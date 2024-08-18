export const checkForErrors = (inputVal, data, cities, warningElement) => {
  if (inputVal === '') {
    warningElement.innerText = 'Input vazio, digite uma cidade.';
    return true;
  }
  if (data.cod === '404') {
    warningElement.innerText = 'Cidade não encontrada!';
    return true;
  }
  const cityExists = cities.some(city => {
    return data.name === city.name && data.weather[0].main === city.weather[0].main && city.main.temp === data.main.temp;
  });
  if (cityExists) {
    warningElement.innerText = 'Cidade já consultada';
    return true;
  }
  return false;
};

export const createMarkup = (data) => {
  const { main, name, weather, wind, sys } = data;

  return `
    <h2>${name} <sup>${sys.country}</sup></h2>
    <h1>${Math.round(main.temp)}<sup>°C</sup></h1>
    <img src="./img/${weather[0].icon}.svg" alt="" class="weather-img"><br />
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
};