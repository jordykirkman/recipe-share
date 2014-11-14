define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.UserRoute = Ember.Route.extend({
		model: function(params){

			return this.store.find('user', params.user_id);

		},
		actions: {
			error: function(error, transition) {
				console.log('hi');
				this.transitionTo('login');
				if (error && error.status === 401) {
					console.log(error);
					// error substate and parent routes do not handle this error
					localStorage.removeItem('sessionToken');
					this.transitionTo('login');
				}

				// Return true to bubble this event to any parent route.
				return true;

			}
		}
	});


});