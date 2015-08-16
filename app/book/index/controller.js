import Ember from 'ember';

export default Ember.Controller.extend({

	needs: ['user'],

	foundUsers: [],
	actions: {
		findUser: function(){
			var user = this.get('share');
			var self = this;
			this.store.find('user', { username: user }).then(function(users){
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
		},
		leaveBook: function(){
			var model = this.get('model');
			var user = this.get('controllers.user.model');
			model.get('users').then(function(users){
				users.removeObject(user);
				model.save().then(function(book){
					alert("You have left this book");
				})
			});

		}
	}

});
