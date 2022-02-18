// iss.js

const request = require('request');




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

    let coordinates = {
      'latitude':dataObj['latitude'],
      'longitude':dataObj['longitude']
    };

    callback(null, coordinates);

  });

};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
