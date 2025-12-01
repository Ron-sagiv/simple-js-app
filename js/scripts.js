
const pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  required keys for validation
  const expectedKeys = ["name", "detailsUrl"];

  // 1.7 bonus — loading message element
  function showLoadingMessage() {
    let loading = document.createElement('div');
    loading.classList.add('loading-message');
    loading.innerText = 'Loading...';
    document.body.appendChild(loading);
  }

  // 1.7 bonus— remove loading message
  function hideLoadingMessage() {
    let loading = document.querySelector('.loading-message');
    if (loading) {
      loading.remove();
    }
  }



  // Define functions separately using the function keyword
  function getAll() {
    return pokemonList;
  }

  function add(item) {
    // validation — must be a real object
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      console.error("add() failed: item must be a non-null object.");
      return;
    }

    //  validate keys
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
  // findByName function, using filter()
  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
  }

  //1.6 new code: addingg list item
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    // capitalize the first letter of each name
    button.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    button.classList.add('button1');

    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    ////event listener 1.6.2.2
    //call the new event listener function
    addButtonEventListener(button, pokemon);
  }
  // separate event listener handler
  function addButtonEventListener(button, pokemon) {   // ADDED
    button.addEventListener('click', function (event) {    // MOVED HERE
      showDetails(pokemon);
    });

  }
  ////1.7 loadlist 
  function loadList() {
    showLoadingMessage(); // 1.7 bunus show loading message
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage(); // 1.7 bunus hide loading message
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        ///load all the list to console
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage(); // 1.7 bonus
      console.error(e);
    })
  }
  ///1.7 load details"
  function loadDetails(item) {
    showLoadingMessage(); // 1.7 bonus show load message

    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage(); // 1.7 bonus hide load message
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage(); // 1.7 bonus hide load message
      console.error(e);
    });
  }


  // 1.6.2 show details function
  // function showDetails(pokemon){
  //   console.log(pokemon);
  // }

  // 1.7 show details function:
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // 3 + 4: Return ONLY an object with matching key:value names
  return {
    //1.7
    loadList: loadList,
    //previous
    getAll: getAll,
    add: add,
    findByName: findByName,
    addListItem: addListItem,
    //1.7

    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();//  This is the IIFE part

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)

  });

});
