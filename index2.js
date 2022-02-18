// index.js

const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPassTimes = function(passTimes) {

  //Loop through each pass time
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((response)=> {
    printPassTimes(response);
  })
  .catch((error) => {
    console.log('error', error.message);
  });



