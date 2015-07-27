module.exports = function(app) {
  var express = require('express');
  var recipeRouter = express.Router();

  recipeRouter.get('/', function(req, res) {
    res.send({
      'recipe': []
    });
  });

  recipeRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  recipeRouter.get('/:id', function(req, res) {
    res.send({
      'recipe': {
        id: req.params.id
      }
    });
  });

  recipeRouter.put('/:id', function(req, res) {
    res.send({
      'recipe': {
        id: req.params.id
      }
    });
  });

  recipeRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/recipe', recipeRouter);
};
