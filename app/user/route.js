import Ember from 'ember';

export default Ember.Route.extend({

	afterModel: function(user) {
		var userId = user.get('id');
		this.store.query('book', {userInvites: userId});
		this.store.query('book', {'users': userId});
	},

	setupController: function(controller, model){

		FB.getLoginStatus(function(response) {
			if(response.status === 'connected'){
				FB.api("/me?fields=id,name,email,friends", function(response) {
					if (response && !response.error) {
						controller.set('facebookFriends', response.friends.data);
					}
				});
				// FB.api("/me/friends?fields=id,name,email,friends", function(response) {
				// 	if (response && !response.error) {
				// 		console.log(response.data);
				// 		controller.set('facebookFriends', response.data);
				// 	}
				// });
			}
		});

		this._super(controller, model);
	}

});
