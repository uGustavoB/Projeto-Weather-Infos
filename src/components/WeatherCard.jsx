export default function WeatherCard({ post }) {

  const { main, name, weather, wind, sys } = post;

  return (
    <div className="weather-card">
      <h2>{name} <sup>{sys.country}</sup></h2>
      <h1>{Math.round(main.temp)}<sup>°C</sup></h1>
      <img src={`/img/${weather[0].icon}.svg`} alt="" className="weather-img" />
      <div className="weather-details">
        <div className="humidity">
            <i className="bi bi-water"></i>
            <div className="text">
              <span>{main.humidity}</span>
              <p>Humidade</p>
            </div>
          </div>
          <div className="wind">
            <i className="bi bi-wind"></i>
            <div className="text">
              <span>{wind.speed}</span>
              <p>Velocidade</p>
            </div>
        </div>
      </div>
    </div>
  )
}