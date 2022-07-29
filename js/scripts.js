
// fetch to get data from pokeapi
let fetchPokemon = () => {
  let pokemonList = [];
  for( let i = 1; i <= 150; i++) { // iterate pokemon 1 through 150
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    pokemonList.push(fetch(url).then( res => res.json()));
  }
  
  Promise.all(pokemonList).then( results => {
    let pokemon = results.map( data => ({ // iterate through each result and returns new array of objects
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      height: data.height + ' dm',
      weight: data.weight + ' hg',
      type: data.types.map( type => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
  });
};

let displayPokemon = (pokemon) => {
  console.log(pokemon);
}

fetchPokemon();