const https = require('https');

const createHobbiesWithAverageAges = (array) => {
    const ageTotal = {}
    const hobbyOccurrences = {}
    const ageAvergare = {}
    for ( let i = 0; i < array.length; i++ ) {
        const p = array[i]
        if ( p.hasOwnProperty('isMember') && typeof(p.isMember) === "boolean" ) {
            for(let j = 0; j < p.hobbies.length; j++){
                const q = p.hobbies[j];
                hobbyOccurrences[ q ] = (hobbyOccurrences[ q ] || 0) + 1
                ageTotal[ q ] = (ageTotal[ q ] || 0) + p.age
                ageAvergare[ q ] = Math.round(ageTotal[ q ]/hobbyOccurrences[ q ])
            }
        }
    }
    return ageAvergare;
};

const isValideJson = (str) =>{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const API_URL = 'https://tiedostot.avoine.com/ts/people.json';

https.get(API_URL, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
      if(isValideJson(data)){
          console.log(createHobbiesWithAverageAges(JSON.parse(data).people));
      }
    
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});