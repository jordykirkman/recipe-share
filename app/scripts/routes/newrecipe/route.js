define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.BookNewrecipeRoute = Ember.Route.extend({
		model: function(){
			if(this.get('controller.model') && this.get('controller.model.isNew') === true){
				return this.get('controller.model');
			} else {
				return this.store.createRecord('recipe', {
					name: "Your new recipe"
				});
			}
		},
		setupController: function(controller, model){
			var book = this.modelFor('book');
			console.log(book);
			controller.set('model', model);
			controller.set('book', book);
		}
	});


});