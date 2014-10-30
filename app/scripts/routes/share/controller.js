define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.BookShareController = Ember.Controller.extend({
		foundUsers: [],
		actions: {
			findUser: function(){
				var user = this.get('share');
				var self = this;
				this.store.find('user', { username: user }).then(function(users){
					console.log(users);
					self.set('foundUsers', users);
				});
			},
			addToBook: function(user){
				var model = this.get('model');
				model.get('users').then(function(users){
					users.addObject(user);
					model.save().then(function(book){
						alert('Shared with ' + user.get('username'));
					});
				});

			}
		}
	
	});

});