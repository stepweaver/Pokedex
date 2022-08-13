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
    console.log(pokemon);
  });
};

fetchPokemon();