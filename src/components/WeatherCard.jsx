import { motion } from 'framer-motion';

export default function WeatherCard({ post, add, remove, check, toggleFavorites }) {

  const { main, name, weather, wind, sys } = post;

  return (
    <motion.div
    className="weather-card"
    initial={{ opacity: 0 , y: -50}}
    animate={{ opacity: 1, y: 0}}
    transition={{
      type: 'spring',
      bounce: 0.5,
      duration: 0.7,
      delayChildren: 0.5,
      staggerChildren: 0.50
    }}
    >
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
        <button className='btn-favorite'>
          <i
            className={check(name) ? 'bi bi-star-fill' : 'bi bi-star'}
            onClick={toggleFavorites}
          ></i>
        </button>
      </div>
    </motion.div>
  )
}