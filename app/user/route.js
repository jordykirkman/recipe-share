import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
		error: function() {
			localStorage.removeItem('sessionToken');
			this.transitionTo('index');
		}
	}

});
