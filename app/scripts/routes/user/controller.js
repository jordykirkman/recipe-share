define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.UserController = Ember.Controller.extend({
		actions: {
			logout: function(){

				localStorage.removeItem('sessionToken');

				this.transitionToRoute('login');

			}
		}
	});

});