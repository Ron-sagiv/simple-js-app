
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




















//a loop to present the pokemons (name and height) in the website
// and it highlights 1 pokemon that is tall

//code from previous task that needs to be replaced:
// const minHeightToTriggerText = 2;
// const bigText = 'That\'s a big one!'
// let isBigTextPrinted = false;

// for (i = 0; pokemonList[i];i++) {

//     let text = '<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')';
//     if (pokemonList[i].height >= minHeightToTriggerText && !isBigTextPrinted) {
//         text += ' - ' + bigText 
//          isBigTextPrinted = true
//     }


//     text += '</p>';
//     document.write(text);
    
// }

//****Part 1 of exe1.5*****
//  Using for.Each in order to present all pokemons with all of their characteristics 
// pokemonList.forEach(function(pokemon) {
//   document.write(`${pokemon.name} (type: ${pokemon.types.join(', ')}, height: ${pokemon.height}, abilities: ${pokemon.abilities.join(', ')})<br>`);
// });


