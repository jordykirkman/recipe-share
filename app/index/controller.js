import Ember from 'ember';

export default Ember.Controller.extend({

	signup: false,
	rememberMe: false,

	username: null,
	password: null,
	email: null,

	errors: [],

	actions: {

		toggleSignup: function(){
			this.toggleProperty('signup');
		},

		facebookLogin: function(){
			var controller = this;

			FB.login(function(response) {
				var expiration = moment(response.authResponse.expiresIn, 'X').format();
				var authData = {'facebook': {}};
				authData['facebook']['id'] = response.authResponse.userID;
				authData['facebook']['access_token'] = response.authResponse.accessToken;
				authData['facebook']['expiration_date'] = expiration;
				FB.api('/me', function(meResponse) {
					console.log(meResponse);
					var newUser = JSON.stringify({user: {'authData': authData, 'username': meResponse.name, 'facebookUser': response.authResponse.userID}});
					Ember.$.ajax('api/users', {
						type: 'POST',
						data: newUser,
						contentType: 'application/json',
						success: function(response){
							var user = JSON.parse(response);
							console.log(user);

							var token = {authData: authData};
							localStorage.setItem('sessionToken', JSON.stringify(token));

							controller.store.pushPayload('user', user);
							controller.transitionToRoute('user', user.user.id);
						}
					});
				});
			}, {
				scope: 'email'
			});
		},

		signup: function(){
			var u = this.get('username');
			var p = this.get('password');
			var e = this.get('email');
			var self = this;
			var newUser = this.store.createRecord('user', {username: u, password: p, email: e});
			newUser.save().then(function(user){
				self.set('model', user);
				if(user.get('error')){
					self.transitionToRoute('login.error', user);
				} else {
					self.transitionToRoute('user', user);
				}
			});
		},

		login: function(){
			var u = this.get('username');
			var p = this.get('password');
			var self = this;
			Ember.$.getJSON('api/login?username=' + u + '&password=' + p).then(function(data) {

				// login was successful, create a session
				if(data){
			    	var token = {sessionToken: data.user.sessionToken, user: data.user.id};
			    	console.log(data.user.sessionToken, data.user.id);
			    	localStorage.setItem('sessionToken', JSON.stringify(token));
			    	// self.store.pushPayload('user', data.user);
			    	self.store.find('user', data.user.id).then(function(user){
			    		self.transitionToRoute('user', user);
			    	});
				} else {
					self.transitionToRoute('login');
				}
			});
		}
	}
	
});
