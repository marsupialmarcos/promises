/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // pluckFirstLineFromFileAsync – to get the GitHub username

  return fs.readFile(readFilePath)
    .then((notAUser, userData) => {
      if (notAUser) {
        throw new Error('User does not exist');
      } else {
        return userData;
      }

    })

    .then((userData) => {
      var dataArray = userData.toString().split('\n');
      var userName = dataArray[0];
      return getGitHubProfile(userName);
    })

    // getGitHubProfile

    .then((userName) => {
      var options = {
        url: 'https://api.github.com/users/' + userName,
        headers: { 'User-Agent': 'request' },
        json: true // will JSON.parse(body) for us
      };
      return request.get(options);
    })

    .then((notFound, resolve, body) => {
      if (notFound) {
        throw new Error('Failed to get GitHub profile: ' + body.message, null);
      } else {
        return body;
      }
    })

    //writeFile to writeFilePath

    .then((body) => {
      return new Promise ((resolve, reject) => {
        fs.writeFile(writeFilePath, body, (err, data) => {
          if (err) {
            reject (err);
            return;
          }
          resolve(data);
        });
      });
    });
    

  

 
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
