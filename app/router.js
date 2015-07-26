import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('user', function() {
    this.route('newbook');
    this.resource('book', function() {
      this.route('newrecipe');
      this.route('recipe');
    });
  });
});

export default Router;
