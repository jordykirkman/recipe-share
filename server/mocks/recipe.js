module.exports = function(app) {
  var express = require('express');
  var recipeRouter = express.Router();
  var request = require('request');
  var bodyParser = require('body-parser');

    // we need to tell the routes to use the environment variables as headers
  recipeRouter.use(function(req, res, next){

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

  // get all recipes
  recipeRouter.get('/', function(req, res) {

    // if a list of ids is in the query string, fetch them all
    if(req.query.ids){

      var objects = [];
      req.query.ids.forEach(function(id){
        objects.push('{"objectId":"' + id + '"}');
      });
      var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      var options = {
        url: 'https://api.parse.com/1/classes/Recipe?' + params,
        method: 'GET',
        headers: req.headers,
      }

      request(options, function (error, response, body) {
        var formattedResponse = {};
        formattedResponse['recipes'] = [];

          JSON.parse(body).results.forEach(function(item){
            item.id = item.objectId;
            formattedResponse['recipes'].push(item);
          });

          res.send(JSON.stringify(formattedResponse));

      })

    } else {

      // otherwise get them all
      var options = {
        url: 'https://api.parse.com/1/classes/Recipe/',
        method: 'GET',
        headers: req.headers,
      }

      request(options, function (error, response, body) {

          var finalResponse = JSON.parse(body);
          finalResponse.id = finalResponse.objectId;
          res.send(JSON.stringify(finalResponse));

      })
    }
  });

  // get user by id
  recipeRouter.get('/:id', function(req, res) {
    var id = req.params.id;

    var options = {
      url: 'https://api.parse.com/1/classes/Recipe/' + id,
      method: 'GET',
      headers: req.headers,
    }

    request(options, function (error, response, body) {

        var finalResponse = JSON.parse(body);
        finalResponse.id = finalResponse.objectId;
        res.send(JSON.stringify({'recipe': finalResponse}));

    })
  });

  // create a new user
  recipeRouter.post('/', function(req, res) {
    var data = req.body.recipe;

    var options = {
      url: 'https://api.parse.com/1/classes/Recipe/',
      headers: req.headers,
      body: JSON.stringify(data),
      method: 'post'
    }

    request(options, function (error, response, body) {
      if(JSON.parse(body).error){
        res.send(body);
      } else {
        // parse Baas doesnt return a whole object, so if there is no error
        // we need to just add the id to the original object and return it
          var finalResponse = {};
          finalResponse['recipe'] = data;
          finalResponse['recipe']['id'] = JSON.parse(body).objectId;
          res.send(JSON.stringify(finalResponse));
        }
    });
  });

  // update user by id
  recipeRouter.put('/:id', function(req, res) {
    var id = req.params.id;
    var data = req.body;

    var options = {
      url: 'https://api.parse.com/1/classes/Recipe/' + id,
      headers: req.headers,
      body: data,
      method: 'put'
    }

    request(
      options,
        function (error, response, body) {
          var finalResponse = JSON.parse(body);
          finalResponse.id = finalResponse.objectId;
          res.send(JSON.stringify(finalResponse));
        }
    );
  });

  app.use('/api/recipes', recipeRouter);

};