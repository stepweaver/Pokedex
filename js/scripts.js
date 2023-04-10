let pokedex = document.querySelector('.list-group');
let pokeCache = {};
let page = 1;

// fetch to get data from pokeapi.
let fetchPokemon = async (page) => {
  let limit = 20;
  let offset = (page - 1) * limit;
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  let res = await fetch(url);
  let data = await res.json();
  let pokemon = data.results.map((result, index) => ({
    ... result,
    id: index + offset + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1}.png`
  }));
  displayPokemon(pokemon);
};

// displays pokemon in pokedex container.
let displayPokemon = (pokemon) => {
  let pokemonHTMLString = pokemon.map( pokeman => `
  <li class="card list-group-item text-light text-center text-capitalize btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="selectPokemon(${pokeman.id})">
    <img class="card-image" src="${pokeman.image}" />
    <h2 class="card-title">${pokeman.name}</h2>
  </li>
  `).join('');
  pokedex.innerHTML += pokemonHTMLString;
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

  let nameElement = ("<h1>" + pokeman.id + "  " + pokeman.name + "</h1>");
  let imageElement = $('<img class="modal-img" style="width:50%">');
  imageElement.attr("src", image);
  let heightElement = $("<p>" + "Height: " + pokeman.height + " dm </p>");
  let weightElement = $("<p>" + "Weight: " + pokeman.weight + " hg </p>");
  let typesElement = $("<p>" + "Type: " + type + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
};

// Initial fetch for the first page.
fetchPokemon(page);

// Event listener to detect when the user has scrolled to the bottom of the page.
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    fetchPokemon(page);
  }
});