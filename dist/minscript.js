const pokemonRepository = (function () {
  let t = [],
    e = ['name', 'detailsUrl'];
  function o() {
    let t = document.createElement('div');
    t.classList.add('loading-message'),
      (t.innerText = 'Loading...'),
      t.setAttribute('aria-live', 'polite'),
      document.body.appendChild(t);
  }
  function n() {
    let t = document.querySelector('.loading-message');
    t && t.remove();
  }
  function i() {
    return t;
  }
  function a(o) {
    if ('object' != typeof o || Array.isArray(o) || null === o) return;
    let n = Object.keys(o),
      i = n.length === e.length && n.every((t) => e.includes(t));
    i && t.push(o);
  }
  async function s() {
    return (
      o(),
      fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
        .then((t) => t.json())
        .then((t) => {
          n(), t.results.forEach((t) => a({ name: t.name, detailsUrl: t.url }));
        })
        .catch((t) => n())
    );
  }
  async function l(t) {
    return (
      o(),
      fetch(t.detailsUrl)
        .then((t) => t.json())
        .then((e) => {
          n(),
            (t.imageUrl = e.sprites.front_default),
            (t.height = e.height),
            (t.types = e.types.map((t) => t.type.name)),
            (t.abilities = e.abilities.map((t) => t.ability.name));
        })
        .catch((t) => n())
    );
  }
  function r(t) {
    l(t).then(function () {
      let e = t.name.toUpperCase(),
        o = `
        <p><strong>Height:</strong> ${t.height}</p>
        <p><strong>Types:</strong> ${t.types.join(', ')}</p>
        <p><strong>Abilities:</strong> ${t.abilities.join(', ')}</p>
        <img src="${t.imageUrl}" alt="${t.name} artwork" />
      `;
      $('#pokemonModalLabel').text(e),
        $('#pokemonModal .modal-body').html(o),
        $('#pokemonModal').on('shown.bs.modal', function () {
          $('#pokemonModal .close').trigger('focus');
        }),
        $('#pokemonModal').modal('show');
    });
  }
  return {
    loadList: s,
    getAll: i,
    add: a,
    findByName: function e(o) {
      return t.filter((t) => t.name === o);
    },
    addListItem: function t(e) {
      let o = document.querySelector('.pokemon-list'),
        n = document.createElement('li');
      n.classList.add('list-group-item');
      let i = document.createElement('button');
      (i.innerText = e.name),
        i.classList.add('btn', 'btn-dark', 'btn-block'),
        i.setAttribute('data-toggle', 'modal'),
        i.setAttribute('data-target', '#pokemonModal'),
        i.setAttribute('aria-label', `Show details for ${e.name}`),
        n.appendChild(i),
        o.appendChild(n),
        (function t(e, o) {
          e.addEventListener('click', function (t) {
            t.preventDefault(), r(o);
          });
        })(i, e);
    },
    loadDetails: l,
    showDetails: r,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
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
