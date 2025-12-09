// POKEMON REPOSITORY IIFE
const pokemonRepository = (function () {
  let pokemonList = [];

  const expectedKeys = ['name', 'detailsUrl'];

  function showLoadingMessage() {
    let loading = document.createElement('div');
    loading.classList.add('loading-message');
    loading.innerText = 'Loading...';
    loading.setAttribute('aria-live', 'polite');
    document.body.appendChild(loading);
  }

  function hideLoadingMessage() {
    let loading = document.querySelector('.loading-message');
    if (loading) loading.remove();
  }

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item !== 'object' || Array.isArray(item) || item === null)
      return;
    const keys = Object.keys(item);
    const valid =
      keys.length === expectedKeys.length &&
      keys.every((k) => expectedKeys.includes(k));
    if (!valid) return;
    pokemonList.push(item);
  }

  function findByName(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  function handlePokemonBtnClick(button, pokemon) {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      /* add temporary “clicked” CSS class */
      button.classList.add('clicked');

      /* remove highlight when modal closes */
      $('#pokemonModal').on('hidden.bs.modal', function () {
        button.classList.remove('clicked');
      });

      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let ul = document.querySelector('.pokemon-list');
    let li = document.createElement('li');
    li.classList.add('card', 'list-group-item');

    li.innerText = pokemon.name;
    ul.appendChild(li);

    handlePokemonBtnClick(li, pokemon);
  }

  async function loadList(apiUrl) {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        hideLoadingMessage();
        json.results.forEach((item) =>
          add({ name: item.name, detailsUrl: item.url })
        );
      })
      .catch((e) => hideLoadingMessage());
  }

  async function loadDetails(item) {
    showLoadingMessage();
    return fetch(item.detailsUrl)
      .then((response) => response.json())
      .then((details) => {
        hideLoadingMessage();
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((t) => t.type.name);
        // abilities rubric added
        item.abilities = details.abilities.map((a) => a.ability.name);
      })
      .catch((e) => hideLoadingMessage());
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      const modalTitle = item.name.toUpperCase();
      const modalBody = `
        <p><strong>Height:</strong> ${item.height}cm</p>
        <p><strong>Weight:</strong> ${item.weight}g</p>
        <p><strong>Types:</strong> ${item.types.join(', ')}</p>
        <p><strong>Abilities:</strong> ${item.abilities.join(', ')}</p>
        <img src="${item.imageUrl}" alt="${item.name} artwork" />
      `;

      $('#pokemonModalLabel').text(modalTitle);
      $('#pokemonModal .modal-body').html(modalBody);

      // Focus trap & focus modal when opened
      $('#pokemonModal').on('shown.bs.modal', function () {
        $('#pokemonModal .close').trigger('focus');
      });

      $('#pokemonModal').modal('show');
    });
  }

  return {
    loadList,
    getAll,
    add,
    findByName,
    addListItem,
    loadDetails,
    showDetails,
  };
})();

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';

// Initialize Pokémon list
pokemonRepository.loadList(apiUrl).then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search logic
const searchInpt = document.getElementById('searchinp');
const pokemonList = document.querySelector('.pokemon-list');
searchInpt.addEventListener('keyup', function (e) {
  pokemonList.childNodes.forEach(function (n) {
    if (n.innerText.includes(searchInpt.value)) {
      n.style.display = 'block';
    } else {
      n.style.display = 'none';
    }
  });
});

//  BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.remove('hide');
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
    backToTopBtn.classList.add('hide');
  }
});

// Scroll smoothly to top
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
