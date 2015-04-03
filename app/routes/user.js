import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
		error: function(error, transition) {
			localStorage.removeItem('sessionToken');
			this.transitionTo('login');
		}
	}
	
});
