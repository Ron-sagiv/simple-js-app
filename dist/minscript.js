const pokemonRepository = (function () {
  let e = [],
    t = ['name', 'detailsUrl'];
  function o() {
    let e = document.createElement('div');
    e.classList.add('loading-message'),
      (e.innerText = 'Loading...'),
      e.setAttribute('aria-live', 'polite'),
      document.body.appendChild(e);
  }
  function n() {
    let e = document.querySelector('.loading-message');
    e && e.remove();
  }
  function i() {
    return e;
  }
  function s(o) {
    if ('object' != typeof o || Array.isArray(o) || null === o) return;
    let n = Object.keys(o),
      i = n.length === t.length && n.every((e) => t.includes(e));
    i && e.push(o);
  }
  async function a(e) {
    return (
      o(),
      fetch(e)
        .then((e) => e.json())
        .then((e) => {
          n(), e.results.forEach((e) => s({ name: e.name, detailsUrl: e.url }));
        })
        .catch((e) => n())
    );
  }
  async function l(e) {
    return (
      o(),
      fetch(e.detailsUrl)
        .then((e) => e.json())
        .then((t) => {
          n(),
            (e.imageUrl = t.sprites.other.dream_world.front_default),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = t.types.map((e) => e.type.name)),
            (e.abilities = t.abilities.map((e) => e.ability.name));
        })
        .catch((e) => n())
    );
  }
  function r(e) {
    l(e).then(function () {
      let t = e.name.toUpperCase(),
        o = `
        <p><strong>Height:</strong> ${e.height}cm</p>
        <p><strong>Weight:</strong> ${e.weight}g</p>
        <p><strong>Types:</strong> ${e.types.join(', ')}</p>
        <p><strong>Abilities:</strong> ${e.abilities.join(', ')}</p>
        <img src="${e.imageUrl}" alt="${e.name} artwork" />
      `;
      $('#pokemonModalLabel').text(t),
        $('#pokemonModal .modal-body').html(o),
        $('#pokemonModal').on('shown.bs.modal', function () {
          $('#pokemonModal .close').trigger('focus');
        }),
        $('#pokemonModal').modal('show');
    });
  }
  return {
    loadList: a,
    getAll: i,
    add: s,
    findByName: function t(o) {
      return e.filter((e) => e.name === o);
    },
    addListItem: function e(t) {
      let o = document.querySelector('.pokemon-list'),
        n = document.createElement('li');
      n.classList.add('card', 'list-group-item'),
        (n.innerText = t.name),
        o.appendChild(n),
        (function e(t, o) {
          t.addEventListener('click', function (e) {
            e.preventDefault(),
              t.classList.add('clicked'),
              $('#pokemonModal').on('hidden.bs.modal', function () {
                t.classList.remove('clicked');
              }),
              r(o);
          });
        })(n, t);
    },
    loadDetails: l,
    showDetails: r,
  };
})();
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
pokemonRepository.loadList(apiUrl).then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
const searchInpt = document.getElementById('searchinp'),
  pokemonList = document.querySelector('.pokemon-list');
searchInpt.addEventListener('keyup', function (e) {
  pokemonList.childNodes.forEach(function (e) {
    e.innerText.includes(searchInpt.value)
      ? (e.style.display = 'block')
      : (e.style.display = 'none');
  });
});
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  window.scrollY > 200
    ? (backToTopBtn.classList.remove('hide'),
      backToTopBtn.classList.add('show'))
    : (backToTopBtn.classList.remove('show'),
      backToTopBtn.classList.add('hide'));
}),
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
