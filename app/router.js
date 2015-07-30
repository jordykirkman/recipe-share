import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('user', { path: '/:user_id' }, function() {
    this.resource('newbook');
    this.resource('book', { path: '/:book_id' }, function() {
      this.resource('newrecipe');
      this.resource('recipe', { path: '/:recipe_id' });
    });
  });
});

export default Router;