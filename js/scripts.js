let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  // MODAL CONTAINER

  let modalContainer = document.querySelector('#modal-container');
  let modalClose = document.querySelector('#modal-close');
  let modalTitle = document.querySelector('#modal-titel');
  let modalContent = document.querySelector('#modal-content');

  function showModal(pokemon) {
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonImg = document.createElement('img');
    pokemonImg.classList.add('img-fluid');
    pokemonImg.src = pokemon.imageUrl;

    let titleElement = document.createElement('h2');
    titleElement.classList.add('text-upper');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.classList.add('col');
    contentElement.classList.add('text-center');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let contentElement2 = document.createElement('p');
    contentElement2.classList.add('col');
    contentElement2.classList.add('text-center');
    contentElement2.innerText = 'Weight: ' + pokemon.weight;

    let contentElement3 = document.createElement('p');
    contentElement3.classList.add('col');
    contentElement3.classList.add('text-center');
    contentElement3.innerText = 'Type: ' + pokemon.types;

    let contentElement4 = document.createElement('p');
    contentElement4.classList.add('col');
    contentElement4.classList.add('text-center');
    contentElement4.innerText = 'Abilitie(s) ' + pokemon.abilities;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});