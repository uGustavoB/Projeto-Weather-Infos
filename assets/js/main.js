import { Weather } from './weather.js';
import { renderFavorites } from './favorites.js';

const weather = new Weather();
weather.init();

// Pessoal, aqui eu adicionei eventos de clique para mostrar e esconder a aba de favoritos! Cuidado na implementação
document.querySelector('.btn-favorites').addEventListener('click', () => {
    const favoritesBox = document.querySelector('.favorites-box');
    // Mostra a aba de favoritos
    favoritesBox.style.display = 'block'; 
    // Atualiza a lista de favoritos 'renderFavorites()'
    renderFavorites(); 
});

document.querySelector('.btn-hide-favorites').addEventListener('click', () => {
    const favoritesBox = document.querySelector('.favorites-box');
    // Esconde a aba de favoritos
    favoritesBox.style.display = 'none'; 
});