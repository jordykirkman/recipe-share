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

    if(req.get("X-Parse-Session-Token")){
      headers["X-Parse-Session-Token"] = req.get("X-Parse-Session-Token");
    }

    req.headers = headers;
    
    next();
  });

  // get all books or get by query string
  userRouter.get('/', function(req, res) {

    // if a list of ids is in the query string, fetch them all
    if(req.query.ids || req.query.username){

      var objects = [];
      if(req.query.ids){
        req.query.ids.forEach(function(id){
          objects.push('{"objectId":"' + id + '"}');
        });
      } else if(req.query.username){
        objects.push('{"username":"' + req.query.username + '"}');
      }
      var params = encodeURIComponent('where={"$or":[' + objects.toString() + ']}');

      var options = {
        url: 'https://api.parse.com/1/users?' + params,
        method: 'GET',
        headers: req.headers
      }

      request(options, function (error, response, body) {
        var formattedResponse = {};
        formattedResponse['users'] = [];

          JSON.parse(body).results.forEach(function(item){
            item.id = item.objectId;
            formattedResponse['users'].push(item);
          });
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

          // lets get the user's books
        var subHeaders = req.headers;
        subHeaders["X-Parse-Session-Token"] = user.sessionToken;

          // this is the object parse needs to search books by user id
          var params = encodeURIComponent('where={"users":"' + user.objectId + '"}');
        var subOptions = {
          url: 'https://api.parse.com/1/classes/Book?' + params,
          headers: subHeaders,
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
          var finalResponse = {};
          finalResponse['user'] = JSON.parse(body);
          finalResponse['user']['id'] = JSON.parse(body).objectId;
          res.send(JSON.stringify(finalResponse));
        }
    );
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