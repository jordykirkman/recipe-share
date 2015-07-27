module.exports = function(app) {
  var express = require('express');
  var loginRouter = express.Router();
  var request = require('request');
  var bodyParser = require('body-parser');


  // we need to tell the routes to use the environment variables as headers
  loginRouter.use(function(req, res, next){

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


  // login with user creds
  loginRouter.get('/', function(req, res) {
    var u = req.query.username;
    var p = req.query.password;

    var returnObj = {};

    var options = {
      url: 'https://api.parse.com/1/login?username=' + u + '&password=' + p,
      method: 'GET',
      headers: req.headers
    }

    request(options, function (error, response, body) {
        var user = JSON.parse(body);

        // if theres an error
        if(user.error){
          res.send(JSON.stringify(user));
        } else {
          // otherwise we need the user's books
          user.id = user.objectId;

        var subHeaders = req.headers;
        subHeaders["X-Parse-Session-Token"] = user.sessionToken;

          returnObj['user'] = user;

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
            returnObj['books'] = books;
            books.forEach(function(book){
              book.id = book.objectId;
              returnObj['user']['books'] = [];
              returnObj['user']['books'].push(book.objectId);
            });
            res.send(JSON.stringify(returnObj));
          });
      }
      });
  });
  app.use('/api/login', loginRouter);
};