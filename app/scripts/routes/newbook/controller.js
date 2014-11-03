define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.UserNewbookController = Ember.Controller.extend({

		actions: {
			saveBook: function(){
				var model = this.get('model');
				var user = this.get('user');
				var self = this;

				// save the book
				model.save().then(function(book){
					
					user.get('books').addObject(book);

					self.transitionToRoute('book', book);

				});
			}
		}
	});

});