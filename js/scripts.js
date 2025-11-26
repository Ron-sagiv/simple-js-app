
const pokemonRepository = (function(){

// pokemon list with characteristics of each one of them
let pokemonList = [{ name: 'Jigglypuff', types: ['Normal', 'Fairy'], height: 0.5, abilities: ['Cute charm', 'Friend guard'] },
{ name: 'Alakazam', types: ['Psychic'], height: 1.5, abilities: ['Synchronize', 'Inner focus', 'Magic guard'] },
{ name: 'Exeggutor', types: ['Grass', 'Psychic'], height: 2, abilities: ['Chlorophyll', 'Harvest'] },
{ name: 'Snorlax', types: ['Normal'], height: 2.1, abilities: ['Immunity', 'Thick fat', 'Gluttony'] },
{ name: 'Miltank', types: ['Normal'], height: 1.2, abilities: ['Thick fat', 'Scrappy', 'Sap-sipper'] }
];


// Bonus task: required keys for validation
  const expectedKeys = ["name", "types", "height", "abilities"];

  // 4: Define functions separately using the function keyword
function getAll(){
   return pokemonList;
}

function add(item){
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
    return pokemonList.filter(function(pokemon) {
      return pokemon.name === name;
    });
  }

  //1.6 new code: addingg list item
function addListItem(pokemon){
let unorderedList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name ;
  button.classList.add('button1');
  listItem.appendChild(button);
  unorderedList.appendChild(listItem);
}

// 3 + 4: Return ONLY an object with matching key:value names
return{
    getAll: getAll,
    add:add,
    findByName: findByName,
     addListItem: addListItem
};

})();// 1: This is the IIFE part

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon)

});






















