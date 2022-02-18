// index.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP("24.85.168.223",(error, coordinates)=> {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , coordinates);
// });



// My test Coordinates: { latitude: 49.6979, longitude: -123.1552 }
// fetchISSFlyOverTimes({ latitude: 49.6979, longitude: -123.1552 }, (error,result)=> {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned results:' , result);
// });


const printPassTimes = function(passTimes) {

  //Loop through each pass time
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }


};

nextISSTimesForMyLocation((error,passTimes) =>{
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);

});
