
// POKEMON REPOSITORY IIFE


const pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  const expectedKeys = ["name", "detailsUrl"];

  // Loading message
  function showLoadingMessage() {
    let loading = document.createElement('div');
    loading.classList.add('loading-message');
    loading.innerText = 'Loading...';
    document.body.appendChild(loading);
  }

  function hideLoadingMessage() {
    let loading = document.querySelector('.loading-message');
    if (loading) {
      loading.remove();
    }
  }

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      console.error("add() failed: item must be a non-null object.");
      return;
    }

    const keys = Object.keys(item);
    const hasSameKeys =
      keys.length === expectedKeys.length &&
      keys.every(key => expectedKeys.includes(key));

    if (!hasSameKeys) {
      console.error(
        `add() failed: object keys must be exactly ${expectedKeys.join(", ")}`
      );
      return;
    }

    pokemonList.push(item);
  }

  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
  }

  function handlePokemonBtnClick(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let pokemonBtn = document.createElement('button');

    pokemonBtn.innerText = pokemon.name;

    pokemonListItem.appendChild(pokemonBtn);
    unorderedList.appendChild(pokemonListItem);

    handlePokemonBtnClick(pokemonBtn, pokemon);
  }

  async function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  async function loadDetails(item) {
    showLoadingMessage();

    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();

      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(t => t.type.name);

    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }


  // showDetails() — now opens MODAL instead of console.log()


  function showDetails(item) {
    loadDetails(item).then(function () {


      // build modal content
      let modalTitle = item.name.toUpperCase();
      let modalText = `
        <strong>Height:</strong> ${item.height}<br>
        <strong>Types:</strong> ${item.types.join(", ")}<br><br>
        <img src="${item.imageUrl}" 
             alt="${item.name}" 
             style="width: 200px; max-width: 80%; display:block; margin:auto;" />
      `;

      // call global showModal()
      window.showModal(modalTitle, modalText);
    });
  }

  return {
    loadList: loadList,
    getAll: getAll,
    add: add,
    findByName: findByName,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



// MODAL IIFE

(function () {
  let modalContainer = document.querySelector('#modal-container');

  //  Expose showModal globally for showDetails()
  window.showModal = function showModal(title, text) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerHTML = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  };

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // ESC closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Clicking outside modal closes it
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      hideModal();
    }
  });

})();
