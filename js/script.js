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
  <li class="list-group-item text-light text-center text-capitalize btn btn-secondary bg-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

function showModal(pokeman) {
  let type = pokeman.types.map( type => type.type.name).join(', ');
  let image = pokeman.sprites['front_default'];

  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + pokeman.name + "</h1>");
  let imageElement = $('<img class="modal-img" style="width:50% height:50%">');
  imageElement.attr("src", image);
  let heightElement = $("<p>" + "Height: " + pokeman.height + "</p>");
  let weightElement = $("<p>" + "Weight: " + pokeman.weight + "</p>");
  let typesElement = $("<p>" + "Type: " + type + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
};

// let showModal = (pokeman) => {
//   let type = pokeman.types.map( type => type.type.name).join(', ');
//   let image = pokeman.sprites['front_default'];
//   let htmlString = `
//     <div id="modal" class="visible">
//       <button id="modal-close" onclick="hideModal()">Close</button>
//     <div class="modal">
//       <img class="card-image" src="${image}" />
//       <h2 class="card-title"><big>#${pokeman.id}</big> ${pokeman.name}</h2>
//       <p><small>Height: </small>${pokeman.height} dm | <small>Weight: </small>${pokeman.weight} hg | <small>Type: </small>${type}
//     </div>
//     </div>`;
//     pokedex.innerHTML = htmlString + pokedex.innerHTML;
// };

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