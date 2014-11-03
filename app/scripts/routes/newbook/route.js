define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.UserNewbookRoute = Ember.Route.extend({
		model: function(){
			if(this.get('controller.model')){
				return this.get('controller.model');
			} else {
				return this.store.createRecord('book', {
					name: "New Book"
				});
			}
		},
		setupController: function(controller, model){
			var user = this.modelFor('user');
			
			model.get('users').then(function(users){
				users.addObject(user);
			});

			controller.set('model', model);
			controller.set('user', user);
		}
	});


});