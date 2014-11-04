define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.UserNewbookRoute = Ember.Route.extend({
		model: function(){
			if(this.get('controller.model') && this.get('controller.model.isNew') === true){
				return this.get('controller.model');
			} else {
				return this.store.createRecord('book', {
					name: "Your new book"
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