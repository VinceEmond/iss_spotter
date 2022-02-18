// iss.js

const request = require('request');



// FUNCTION TO FETCH IP
const fetchMyIP = function(callback) {

  request("https://api.ipify.org?format=json", (error,response, body)=> {

    // If error, return error via callback
    if (error) return callback(error,null);
    
    //If no error but response code not 200
    if (!(response.statusCode === 200)) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // If all is good, parse body into IP
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


// FUNCTION TO COORDINATES FROM IP
const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error,null);
      return;
    }

    //If no error but response code not 200
    if (!(response.statusCode === 200)) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    let dataObj = JSON.parse(body);

    // let coordinates = {
    //   'latitude':dataObj['latitude'],
    //   'longitude':dataObj['longitude']
    // };

    const {latitude, longitude} = JSON.parse(body);
    const coordinates = {longitude,latitude};

    callback(null, coordinates);

  });

};


// FUNCTION TO FETCH FLYOVER FROM COORDINATES
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }

    //If no error but response code not 200
    if (!(response.statusCode === 200)) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip)=> {
    if (error) {
      callback(error,null);
      return;
    }

    fetchCoordsByIP(ip, (error, coordinates)=> {
      if (error) {
        callback(error,null);
        return;
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimes)=> {
        if (error) {
          callback(error,null);
          return;
        }
        callback(null, passTimes);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
