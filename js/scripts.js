// POKEMON REPOSITORY IIFE
const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let ul = document.querySelector('.pokemon-list');
    let li = document.createElement('li');
    li.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-dark', 'btn-block'); /* for contrast */
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('aria-label', `Show details for ${pokemon.name}`);

    li.appendChild(button);
    ul.appendChild(li);

    handlePokemonBtnClick(button, pokemon);
  }

  async function loadList() {
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
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
        <p><strong>Height:</strong> ${item.height}</p>
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

// Initialize Pokémon list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
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
