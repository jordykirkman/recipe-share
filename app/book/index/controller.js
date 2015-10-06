import Ember from 'ember';

export default Ember.Controller.extend({

	userController: Ember.inject.controller('user'),

	foundUsers: [],

	filteredFacebookUsers: function(){
		var key = this.get('facebookFriendSearch');
		if(key){
			return this.get('userController.facebookFriends').filter(function(friend){
				var content = friend.name;
				if(content.toLowerCase().indexOf(key.toLowerCase()) > -1){
					return friend;
				}
			});
		} else {
			return [];
		}
	}.property('facebookFriendSearch'),

	actions: {
		findUser: function(){
			var user = this.get('share');
			var self = this;
			this.store.query('user', { username: user }).then(function(users){
				self.set('foundUsers', users);
			});
		},
		inviteToBookFb: function(user, book){
			this.store.query('user', { facebookUser: user.id }).then(function(users){
				var ourUser = users.get('firstObject');
				book.get('userInvites').pushObject(ourUser);
				book.save().then(function(){
					alert('Shared with ' + user.get('username'));
				});
			});
		},
		inviteToBook: function(user, book){
			book.get('userInvites').pushObject(ourUser);
			book.save().then(function(){
				alert('Shared with ' + user.get('username'));
			});
		},
		leaveBook: function(){
			var model = this.get('model');
			var user = this.get('userController.model');
			model.get('users').then(function(users){
				users.removeObject(user);
				model.save().then(function(book){
					alert("You have left this book");
				})
			});

		}
	}

});
