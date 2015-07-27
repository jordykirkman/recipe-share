module.exports = function(app) {
  var express = require('express');
  var bookRouter = express.Router();

  bookRouter.get('/', function(req, res) {
    res.send({
      'book': []
    });
  });

  bookRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  bookRouter.get('/:id', function(req, res) {
    res.send({
      'book': {
        id: req.params.id
      }
    });
  });

  bookRouter.put('/:id', function(req, res) {
    res.send({
      'book': {
        id: req.params.id
      }
    });
  });

  bookRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/book', bookRouter);
};
