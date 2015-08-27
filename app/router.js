import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', { path: '/:user_id' }, function() {
    this.route('newbook', {resetNamespace: true});
    this.route('newrecipe', {resetNamespace: true});
    this.route('book', { path: '/:book_id', resetNamespace: true }, function() {
      this.route('recipe', { path: '/:recipe_id', resetNamespace: true  });
    });
  });
});

export default Router;