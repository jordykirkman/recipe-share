module.exports = function(app) {
  var express = require('express');
  var userRouter = express.Router();
  var request = require('request');
  var bodyParser = require('body-parser');

  // we need to tell the routes to use the environment variables as headers
  userRouter.use(function(req, res, next){

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
  userRouter.get('/', function(req, res) {

    // if a list of ids is in the query string, fetch them all
    if(req.query.ids || req.query.username || req.query.email || req.query.facebookUser){

      if(req.query.ids){

        var objects = [];
        req.query.ids.forEach(function(id){
          objects.push('{"objectId":"' + id + '"}');
        });
        var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      } else if(req.query.username){

        var objects = [];
        objects.push('{"username":"' + req.query.username + '"}');
        var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      } else if(req.query.email){

        var objects = [];
        objects.push('{"email":"' + req.query.email + '"}');
        var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      } else if(req.query.facebookUser){

        var params = encodeURIComponent('where={"facebookUser":"' + req.query.facebookUser + '"}');

      }

      var options = {
        url: 'https://api.parse.com/1/users?' + params,
        method: 'GET',
        headers: req.headers
      }

      request(options, function (error, response, body) {
        var formattedResponse = {};

        var userArray = JSON.parse(body).results.map(function(item){
          item['id'] = item.objectId;
          delete item.objectId;
          return item;
        });
        formattedResponse['users'] = userArray;
        res.send(JSON.stringify(formattedResponse));

      })

    } else {

      // send back nothing, we do not allow someone to fetch all users
      var formattedResponse = {};
      formattedResponse['users'] = [];
      res.send(JSON.stringify(formattedResponse));
    }
  });

  // get user by id
  userRouter.get('/:id', function(req, res) {
    var id = req.params.id;

    var options = {
      url: 'https://api.parse.com/1/users/' + id,
      method: 'GET',
      headers: req.headers
    }

    request(options, function (error, response, body) {
      var user = JSON.parse(body);

      // if theres an error
      if(user.error){
        res.send(user);
      } else {
        // otherwise we need the user's books

        // lets format the first part of our response
        returnObj = {};
        returnObj['user'] = user;
        returnObj['user']['id'] = user.objectId;

        // this is the object parse needs to search books by user id
        var params = encodeURIComponent('where={"users":"' + user.objectId + '"}');
        var subOptions = {
          url: 'https://api.parse.com/1/classes/Book?' + params,
          headers: req.headers,
          method: 'GET',
        }

        // put the books into the users books array, ember likes it this way
        // request(subOptions, function (error, response, body) {
        //   var books = JSON.parse(body).results;

        //   returnObj['user']['books'] = [];
        //   // returnObj['books'] = books;
        //   var bookIds = books.map(function(book){
        //     return book.objectId;
        //   });
        //   returnObj['user']['books'] = bookIds;
        //   var bookModels = books.map(function(book){
        //     book.id = book.objectId;
        //     return book;
        //   });
        //   returnObj['books'] = bookModels;

          // TEST CODE --------------------------------


    //     var recipeParams = encodeURIComponent('where={"$or":[{"books":{"$in":' + one of the array of ids + '}]}');
    //     var recipeOptions = {
    //       url: 'https://api.parse.com/1/classes/Recipe?' + recipeParams,
    //       headers: req.headers,
    //       method: 'GET',
    //     }

    //     // put the books into the users books array, ember likes it this way
    //     request(recipeOptions, function (error, response, body) {
    //       var recipes = JSON.parse(body).results;
    //       var recipeIds = recipes.map(function(recipe){
    //         return recipe.objectId;
    //       });
    //       recipes = recipes.map(function(recipe){
    //         recipe.id = recipe.objectId;
    //         return recipe;
    //       });
    //       finalResponse['book']['recipes'] = recipeIds;
    //       finalResponse['recipes'] = recipes;
    //       console.log(recipes);
    //       res.send(finalResponse);
    //     });
    // });
      // -------------------------------------------------

          res.send(returnObj);
        // });
      }
    })
  });

  // create a new user
  userRouter.post('/', function(req, res) {
    var data = req.body.user;

    var options = {
      url: 'https://api.parse.com/1/users/',
      headers: req.headers,
      body: JSON.stringify(data),
      method: 'post'
    }

    request.post(options, function (error, response, body) {
      var user = JSON.parse(body);
      var returnObj = {};
      returnObj['user'] = JSON.parse(body);
      returnObj['user']['id'] = JSON.parse(body).objectId;

      // this is the object parse needs to search books by user id
      var params = encodeURIComponent('where={"users":"' + user.objectId + '"}');
      var subOptions = {
        url: 'https://api.parse.com/1/classes/Book?' + params,
        headers: req.headers,
        method: 'GET',
      }

      // put the books into the users books array, ember likes it this way
      request(subOptions, function (error, response, body) {
        var books = JSON.parse(body).results;
        returnObj['user']['books'] = [];
        returnObj['books'] = books;
        books.forEach(function(book){
          book['id'] = book.objectId;
          returnObj['user']['books'].push(book.objectId);
        });
        res.send(JSON.stringify(returnObj));
      });

    });
  });

  // update user by id
  userRouter.put('/:id', function(req, res) {
    var id = req.params.id;
    var data = req.body.user;

    var options = {
      url: 'https://api.parse.com/1/classes/Book/' + id,
      headers: req.headers,
      body: JSON.stringify(data),
      method: 'post'
    }

    request(options, function (error, response, body) {
          var finalResponse = JSON.parse(body);
          finalResponse.id = finalResponse.objectId;
          res.send(JSON.stringify(finalResponse));
        }
    );
  });

  app.use('/api/users', userRouter);

};