define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.UserNewbookController = Ember.Controller.extend({
		name: null,
		description: null,
		actions: {
			saveBook: function(){
				var model = this.get('model');

				// create the new book
				var n = this.get('name');
				var d = this.get('description');
				var newBook = this.store.createRecord('book', {name: n, description: d});

				// save the book
				newBook.save().then(function(book){
					var id = book.get('id');
					var userid = model.get('id');
					var data = {};
					data['book'] = id;
					data['user'] = userid;

					// after its saved, update the user with the book,
					// if that was successful, update the user's book list
					
					// this could be replaced with a .save() on the user
					// with transforms in the php to update it, then return the new user
					$.ajax({
					    url: "api/updateuser.php",
					    type: "POST",
					    data: data,
					    success: function(response) {
					    	model.get('books').pushObject(book);
					    }
					});
				});
			}
		}
	});

});