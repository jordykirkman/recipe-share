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

				var n = this.get('name');
				var d = this.get('description');
				var newBook = this.store.createRecord('book', {name: n, description: d});

				newBook.save().then(function(book){
					console.log(book);
					var id = book.get('id');
					var userid = model.get('id');
					var data = {};
					data['book'] = id;
					data['user'] = userid;
					$.ajax({
					    url: "api/updateuser.php",
					    type: "POST",
					    // contentType: "application/json",
					    data: data,
					    success: function(response) {
					    	console.log(response);
					    }
					});
				});
			}
		}
	});

});