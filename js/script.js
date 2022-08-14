let pokedex = document.getElementById("pokedex");
  
console.log(pokedex);

// fetch to get data from pokeapi.
let fetchPokemon = () => {

  let promises = [];
  for (let i = 1; i <= 150; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then( res => res.json()));
  }

  Promise.all(promises).then( results => {
    let pokemon = results.map( data => ({
      name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map( type => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
  });
};

let displayPokemon = (pokemon) => {
  console.log(pokemon);
  let pokemonHTMLString = pokemon.map( pokeman => `
  <li class="card">
    <img class="card-image" src="${pokeman.image}" />
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle">Type: ${pokeman.type}</p>
  </li>
  `).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();