const { readFile } = require('fs');
const path = require('path');
const getCities = require('/home/munir/Desktop/week6Exercise/week6-test/src/database/queries/getData.js')
const postcities = require('/home/munir/Desktop/week6Exercise/week6-test/src/database/queries/postData.js')
const {
  parse
} = require('querystring');


const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html');
  response.end('<h1>Sorry, there was a problem loading the homepage</h1>');
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, '..', '..', 'public', 'index.html');
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(file);
  });
};

const getCitiesHandler = response => {
  // write your own function that gets data from your database and response with  the result
  getCities((err, result) => {
    if (err) {
      return console.log(err)
    }

    let dynamicData = JSON.stringify(result)
    response.writeHead(200, {
      'content-type': 'application/json'
    });
    response.end(dynamicData)
  });
};

const postCityHandler = (request,response) => {
  // write your code to get the data from html form, then insert the data into the database
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  request.on('end', () => {
    const result = parse(body)
    console.log("name", result.name, "country", result.country)
    postcities(result, (err, data) => {

      if (err) {
        console.log("err", err);
      } else {
        console.log(data);
        response.end();
      }
    })
    
  })
};

const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, '..','..', url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    const extension = url.split('.')[1];
    const extensionType = {
      html: 'text/html',
      css: 'text/css'
    };
    response.writeHead(200, { 'content-type': extensionType[extension] });
    response.end(file);
  });
};

const errorHandler = response => {
  response.writeHead(404, { 'content-type': 'text/html' });
  response.end('<h1>404 Page Requested Cannot be Found</h1>');
};

module.exports = {
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  errorHandler
};
