const pokemonRepository = (function () {
  let e = [],
    t = null,
    n = null,
    o = ['name', 'detailsUrl'];
  function i() {
    let e = document.createElement('div');
    e.classList.add('spinner', 'spinner-grow', 'text-danger'),
      e.setAttribute('aria-live', 'polite'),
      document.body.appendChild(e);
  }
  function s() {
    let e = document.querySelector('.spinner');
    e && e.remove();
  }
  function l() {
    return e;
  }
  function r() {
    return t;
  }
  function a() {
    return n;
  }
  function c(t) {
    if ('object' != typeof t || Array.isArray(t) || null === t) return;
    let n = Object.keys(t),
      i = n.length === o.length && n.every((e) => o.includes(e));
    i && e.push(t);
  }
  async function p(e) {
    return (
      i(),
      fetch(e)
        .then((e) => e.json())
        .then((e) => {
          s(),
            (t = e.previous),
            (n = e.next),
            e.results.forEach((e) => c({ name: e.name, detailsUrl: e.url }));
        })
        .catch((e) => s())
    );
  }
  async function d(e) {
    return (
      i(),
      fetch(e.detailsUrl)
        .then((e) => e.json())
        .then((t) => {
          s(),
            (e.imageUrl = t.sprites.other.dream_world.front_default),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = t.types.map((e) => e.type.name)),
            (e.abilities = t.abilities.map((e) => e.ability.name));
        })
        .catch((e) => s())
    );
  }
  function m(e) {
    d(e).then(function () {
      let t = e.name.toUpperCase(),
        n = `
        <p><strong>Height:</strong> ${e.height}cm</p>
        <p><strong>Weight:</strong> ${e.weight}g</p>
        <p><strong>Types:</strong> ${e.types.join(', ')}</p>
        <p><strong>Abilities:</strong> ${e.abilities.join(', ')}</p>
        <img src="${e.imageUrl}" alt="${e.name} artwork" />
      `;
      $('#pokemonModalLabel').text(t),
        $('#pokemonModal .modal-body').html(n),
        $('#pokemonModal').on('shown.bs.modal', function () {
          $('#pokemonModal .close').trigger('focus');
        }),
        $('#pokemonModal').modal('show');
    });
  }
  return {
    loadList: p,
    getAll: l,
    add: c,
    findByName: function t(n) {
      return e.filter((e) => e.name === n);
    },
    addListItem: function e(t) {
      let n = document.querySelector('.pokemon-list'),
        o = document.createElement('li');
      o.classList.add('card', 'list-group-item'),
        (o.innerText = t.name),
        n.appendChild(o),
        (function e(t, n) {
          t.addEventListener('click', function (e) {
            e.preventDefault(),
              t.classList.add('clicked'),
              $('#pokemonModal').on('hidden.bs.modal', function () {
                t.classList.remove('clicked');
              }),
              m(n);
          });
        })(o, t);
    },
    loadDetails: d,
    showDetails: m,
    getPrevUrl: r,
    getNextUrl: a,
    clearAll: function t() {
      e.length = 0;
      document.querySelector('.pokemon-list').innerHTML = '';
    },
  };
})();
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
const prevBtn = document.querySelector('.prev-btn'),
  nextBtn = document.querySelector('.next-btn');
function loadPokemons(e) {
  pokemonRepository.clearAll(),
    pokemonRepository.loadList(e).then(function () {
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      }),
        null == pokemonRepository.getPrevUrl()
          ? prevBtn.classList.add('hide')
          : prevBtn.classList.remove('hide'),
        null == pokemonRepository.getNextUrl()
          ? nextBtn.classList.add('hide')
          : nextBtn.classList.remove('hide');
    });
}
loadPokemons(apiUrl),
  prevBtn.addEventListener('click', function () {
    let e = pokemonRepository.getPrevUrl();
    e && loadPokemons(e);
  }),
  nextBtn.addEventListener('click', function () {
    let e = pokemonRepository.getNextUrl();
    e && loadPokemons(e);
  });
const searchInpt = document.getElementById('searchinp'),
  pokemonList = document.querySelector('.pokemon-list');
searchInpt.addEventListener('keyup', function (e) {
  pokemonList.childNodes.forEach(function (e) {
    e.innerText.toLowerCase().includes(searchInpt.value.toLowerCase())
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
