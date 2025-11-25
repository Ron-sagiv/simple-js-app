
const pokemonRepository = (function(){

// pokemon list with characteristics of each one of them
let pokemonList = [{ name: 'Jigglypuff', types: ['Normal', 'Fairy'], height: 0.5, abilities: ['Cute charm', 'Friend guard'] },
{ name: 'Alakazam', types: ['Psychic'], height: 1.5, abilities: ['Synchronize', 'Inner focus', 'Magic guard'] },
{ name: 'Exeggutor', types: ['Grass', 'Psychic'], height: 2, abilities: ['Chlorophyll', 'Harvest'] },
{ name: 'Snorlax', types: ['Normal'], height: 2.1, abilities: ['Immunity', 'Thick fat', 'Gluttony'] },
{ name: 'Miltank', types: ['Normal'], height: 1.2, abilities: ['Thick fat', 'Scrappy', 'Sap-sipper'] }
];

// 4: Define functions separately using the function keyword
function getAll(){
   return pokemonList;
}
function add(item){
    pokemonList.push(item);
}
// 3 + 4: Return ONLY an object with matching key:value names
return{
    getAll: getAll,
    add:add
};

})();// 1: This is the IIFE part

pokemonRepository.getAll().forEach(function(pokemon){
  document.write(`${pokemon.name} (type: ${pokemon.types.join(', ')}, height: ${pokemon.height}, abilities: ${pokemon.abilities.join(', ')}))<br>`);

});






















