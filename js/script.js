let pokedex = document.getElementById('pokedex');
let pokeCache = {};

// fetch to get data from pokeapi.
let fetchPokemon = async () => {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;
  let res = await fetch(url);
  let data = await res.json();
  let pokemon = data.results.map((result, index) => ({
    ... result, // ... result will simply pass everything from the api through to the object.
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }));
  displayPokemon(pokemon);
};

// displays pokemon in pokedex container.
let displayPokemon = (pokemon) => {
  let pokemonHTMLString = pokemon.map( pokeman => `
  <li class="card" onclick="selectPokemon(${pokeman.id})">
    <img class="card-image" src="${pokeman.image}" />
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
  </li>
  `).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

let selectPokemon = async (id) => {
  if(!pokeCache[id]){
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let pokeman = await res.json();
    pokeCache[id] = pokeman;
    showModal(pokeman);
  } else
  showModal(pokeCache[id]);
};

let showModal = (pokeman) => {
  let type = pokeman.types.map( type => type.type.name).join(', ');
  let image = pokeman.sprites['front_default'];
  let htmlString = `
    <div class="modal">
      <button id="modal-close" onclick="hideModal()">Close</button>
    <div class="card">
      <img class="card-image" src="${image}" />
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
      <p><small>Height: </small>${pokeman.height} dm | <small>Weight: </small>${pokeman.weight} hg | <small>Type: </small>${type}
    </div>
    </div>`;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

let hideModal = () => {
  let modal = document.querySelector('.modal');
  modal.parentElement.removeChild(modal);
}

window.addEventListener('keydown', (e) => {
  let modal = document.querySelector('.modal');
  if (e.key === 'Escape') {
    hideModal();
  };
});

/* need addEventListener to close when clicking outside of modal */

window.addEventListener('click', function(e) {
  hideModal();
}, true);

fetchPokemon();