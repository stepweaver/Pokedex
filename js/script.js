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
  let pokemonHTMLString = pokemon.map( pokeman => `
    <li class="card list-group-item bg-secondary btn btn-dark text-capitalize text-light" aria-pressed="false" autocomplete="off" onclick="selectPokemon(${pokeman.id})"> 
      <img class="card-image" src="${pokeman.image}" />
      <h2 class="card-title">${pokeman.name}</h2>
    </li>
  `).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

// How do I get this to display in grid and not just one long list?

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
      <div class="modal-card" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-header">
            <h2 class="card-title"><big>#${pokeman.id}</big> ${pokeman.name}</h2>
            <button id="modal-close" class="close" data-dismiss="modal-card" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="card-image" src="${image}" />
            <p><small>Height: </small>${pokeman.height} dm | <small>Weight: </small>${pokeman.weight} hg | <small>Type: </small>${type}
          </div>
        </div>
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