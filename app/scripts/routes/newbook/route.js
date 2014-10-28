define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.UserNewbookRoute = Ember.Route.extend({
		model: function(){
			var m = this.store.createRecord('book', {
				name: "book name"
			});
			console.log(m);
			return m;
		},
		setupController: function(controller, model){
			var user = this.modelFor('user');
			console.log(model);
			model.get('users').then(function(users){
				users.pushObject(user);
			});

			controller.set('model', model);
		}
	});


});