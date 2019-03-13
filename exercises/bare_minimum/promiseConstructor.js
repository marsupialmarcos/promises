/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise ((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      } 
      var dataArray = data.toString().split('\n');
      var firstLine = dataArray[0];
      resolve(firstLine);
    });
  });
  // TODO
  // create a new Promise constructor
  // 
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise ((resolve, reject) => {
    request(url, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.statusCode);
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};


//the error callback has a specific name - reject
//the success callback has a specific name - resolve, absence of first arg null