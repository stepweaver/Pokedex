// fetch to get pokemon data from api

let fetchPokemon = () => {
  let url = `https://pokeapi.co/api/v2/pokemon/1`;
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map( type => type.type.name).join(', ')
      };
      console.log(pokemon);
    });
  };

fetchPokemon();

// let pokedex = document.getElementById('pokedex');
// let pokeCache = {};

// // fetch to get data from pokeapi
// let fetchPokemon = async () => {
//   let url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;
//   let res = await fetch(url);
//   let data = await res.json();
//     let pokemon = data.results.map ( (result, index) =>
//     ({
//       name: result.name,
//       apiUrl: result.url,
//       id: index +1,
//       image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
//     }));
//     displayPokemon(pokemon);
// };

// let displayPokemon = (pokemon) => {
//   // create list item for each pokemon
//   let pokemonHTMLString = pokemon.map ( pokemonList => `
//   <li class="card" onclick="selectPokemon(${pokemonList.id})">
//     <img class="card-image" src='${pokemonList.image}' />
//     <h2 class="card-title">${pokemonList.name}</h2>
//   </li>
//   `)
//   .join('');
//   pokedex.innerHTML = pokemonHTMLString;
// };

// let selectPokemon = async (id) => {
//   if(!pokeCache[id]){
//   let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//   let res = await fetch(url);
//   let pokemonList = await res.json();
//   pokeCache[id] = pokemonList;
//   showModal(pokemonList);
//   }
//   showModal(pokeCache[id]);
// };

// let showModal = (pokemonList) => {
//   let type = pokemonList.types.map( type => type.type.name).join(', ');
//   let image = pokemonList.sprites['front_default'];
//   let htmlString = `
//     <div class="modal">
//       <button id="modal-close" onclick="closeModal()">Close</button>
//       <div class="card">
//         <img class="card-image" src='${image}' />
//         <h2 class="card-title">${pokemonList.name}</h2>
//         <p>
//           <small>Height: </small>${pokemonList.height} dm
//           | <small>Weight: </small>${pokemonList.weight} hg
//           | <small>Type: </small>${type}
//         </p>
//       </div>
//     </div>
//    `;

//   pokedex.innerHTML = htmlString +  pokedex.innerHTML;
//   console.log(htmlString);
// };

// let closeModal = () => {
//   let modal = document.querySelector('.modal');
//   modal.parentElement.removeChild(modal);           // why do I have to click the Close button twice unless the object is in the Cache?
// };

// fetchPokemon();