module.exports = function(app) {
  var express = require('express');
  var bookRouter = express.Router();
  var request = require('request');
  var bodyParser = require('body-parser');

    // we need to tell the routes to use the environment variables as headers
  bookRouter.use(function(req, res, next){

    var appid = 'XGrEmXHbpLlTY19JtCkiFbMKTefSHlUuSMAtKfoX';
    // var appid = process.env.APPID;
    var apikey = 'F7qyoVgyRhw3xVlw0yxeXVmFsoueDWGj947C0sse';
    // var apikey = process.env.APIKEY;

    var headers = {
      "X-Parse-Application-Id": appid,
      "X-Parse-REST-API-Key": apikey,
      "Content-Type": "application/json",
    }

    if(req.get("X-Parse-Master-Key")){
      headers["X-Parse-Master-Key"] = req.get("X-Parse-Master-Key");
    }
  if(req.get("X-Parse-Session-Token")){
    headers["X-Parse-Session-Token"] = req.get("X-Parse-Session-Token");
  }

    req.headers = headers;
    
    next();
  });

  // get all books or get by query string
  bookRouter.get('/', function(req, res) {

    // if a list of ids is in the query string, fetch them all
    if(req.query.ids){

      var objects = req.query.ids.map(function(id){
        return '{"objectId":"' + id + '"}';
      });
      var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      var options = {
        url: 'https://api.parse.com/1/classes/Book?' + params,
        method: 'GET',
        headers: req.headers
      }

      request(options, function (error, response, body) {
        var formattedResponse = {};

        var books = JSON.parse(body).results.map(function(book){
          book.id = book.objectId;
          return book;
        });
        formattedResponse['books'] = books;
        var bookIds = books.map(function(book){
          return book.id;
        });

        var recipeParams = encodeURIComponent('where={"books":{"$or":' + bookIds + '}}');
        var recipeOptions = {
          url: 'https://api.parse.com/1/classes/Recipe?' + params,
          method: 'GET',
          headers: req.headers
        }
        request(recipeOptions, function (error, response, body) {
          var recipes = JSON.parse(body).results;
          console.log(recipes);
          res.send(JSON.stringify(formattedResponse));

        });
        
      })

    } else {

      // otherwise get them all
      var options = {
        url: 'https://api.parse.com/1/classes/Book/',
        method: 'GET',
        headers: req.headers
      }

      request(options, function (error, response, body) {

          var finalResponse = JSON.parse(body);
          finalResponse.id = finalResponse.objectId;
          res.send(JSON.stringify(finalResponse));

      })
    }
  });

  bookRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  bookRouter.get('/:id', function(req, res) {

    var agentOptions = {
      host: 'http://framilyrecipe.com',
    };

    var id = req.params.id;

    var options = {
      url: 'https://api.parse.com/1/classes/Book/' + id,
      method: 'GET',
      headers: req.headers,
      rejectUnauthorized: false
    }

    request(options, function (error, response, body) {
        var book = JSON.parse(body);
        var finalResponse = {'book': book};
        finalResponse.book.id = finalResponse.book.objectId;

        var recipeParams = encodeURIComponent('where={"books":"' + book.objectId + '"}');
        var recipeOptions = {
          url: 'https://api.parse.com/1/classes/Recipe?' + recipeParams,
          headers: req.headers,
          method: 'GET',
        }

        // put the books into the users books array, ember likes it this way
        request(recipeOptions, function (error, response, body) {
          var recipes = JSON.parse(body).results;
          var recipeIds = recipes.map(function(recipe){
            return recipe.objectId;
          });
          recipes = recipes.map(function(recipe){
            recipe.id = recipe.objectId;
            return recipe;
          });
          finalResponse['book']['recipes'] = recipeIds;
          finalResponse['recipes'] = recipes;
          console.log(recipes);
          res.send(finalResponse);
        });
    });
  });

  bookRouter.put('/:id', function(req, res) {
    var id = req.params.id;
    var data = req.body.book;

    var options = {
      url: 'https://api.parse.com/1/classes/Book/' + id,
      headers: req.headers,
      body: JSON.stringify(data),
      method: 'PUT'
    }

    request(options, function (error, response, body) {
      if(JSON.parse(body).error){
        res.send(body);
      } else {
        // parse Baas doesnt return a whole object, so if there is no error
        // we need to just add the id to the original object and return it
          var finalResponse = {};
          finalResponse['book'] = data;
          finalResponse['book']['id'] = id;
          res.send(JSON.stringify(finalResponse));
        }
    });
  });

  bookRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/books', bookRouter);
};
