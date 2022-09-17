let pokedex = document.querySelector('.list-group');
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
  let pokemonHTMLString = pokemon.map(pokeman => `
    <li class="card list-group-item bg-transparent text-light btn btn-dark text-capitalize" onclick="selectPokemon(${pokeman.id})">
      <img class="card-image" src="${pokeman.image}" />
      <h2 class="card-title">${pokeman.name}</h2>
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
    <div id="modal" class="visible">
      <button id="modal-close" onclick="hideModal()">Close</button>
    <div class="modal-card text-light">
      <img class="card-image" src="${image}" />
      <h2 class="card-title"><big>#${pokeman.id}</big> ${pokeman.name}</h2>
      <p><small>Height: </small>${pokeman.height} dm | <small>Weight: </small>${pokeman.weight} hg | <small>Type: </small>${type}
    </div>
    </div>`;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

let hideModal = () => {
  let modal = document.querySelector('#modal');
  modal.classList.remove('visible');
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideModal();
  };
});

window.addEventListener('click', (e) => {
  if (document.querySelector('#modal'))
  hideModal();
}, true);

fetchPokemon();