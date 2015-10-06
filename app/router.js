import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.route('user', { path: '/:user_id' }, function() {
		this.route('newbook' );
		this.route('newrecipe');
		this.route('book', { path: '/:book_id', resetNamespace: true }, function() {
			this.route('recipe', { path: '/:recipe_id' });
			this.route('share', { path: '/:recipe_id/share' });
			this.route('options', { path: '/:recipe_id/options' });
		});
	});
});

export default Router;