// pokemon list with characteristics of each one of them
let pokemonList = [{ name: 'Jigglypuff', types: ['Normal', 'Fairy'], height: 0.5, abilities: ['Cute charm', 'Friend guard'] },
{ name: 'Alakazam', types: 'Psychic', height: 1.5, abilities: ['Synchronize', 'Inner focus', 'Magic guard'] },
{ name: 'Exeggutor', types: ['Grass', 'Psychic'], height: 2, abilities: ['Chlorophyll', 'Harvest'] },
{ name: 'Snorlax', types: 'Normal', height: 2.1, abilities: ['Immunity', 'Thick fat', 'Gluttony'] },
{ name: 'Miltank', types: 'Normal', height: 1.2, abilities: ['Thick fat', 'Scrappy', 'Sap-sipper'] }
];

//a loop to present the pokemons (name and height) in the website
// and it highlights 1 pokemon that is tall


let minHeightToTriggerText = 2;
let bigText = 'That\'s a big one!'
let isBigTextPrinted = false;

for (i = 0; pokemonList[i];i++) {

    let text = '<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')';
    if (pokemonList[i].height >= minHeightToTriggerText && !isBigTextPrinted) {
        text += ' - ' + bigText 
         isBigTextPrinted = true
    }


    text += '</p>';
    document.write(text);
    
}




