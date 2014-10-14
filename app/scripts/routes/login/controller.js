define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.LoginController = Ember.Controller.extend({
		signup: false,

		username: null,
		password: null,
		email: null,

		errors: [],

		actions: {

			toggleSignup: function(){
				this.toggleProperty('signup');
			},

			signup: function(){
				var u = this.get('username');
				var p = this.get('password');
				var e = this.get('email');
				var self = this;
				var newUser = this.store.createRecord('user', {username: u, password: p, email: e});
				newUser.save().then(function(user){
					self.set('model', user);
					self.set('errors', []);
				}, function(response){
					// runs instead if the call failed
					response.errors.user.forEach(function(error){
						self.set('errors', []);
						self.get('errors').pushObject({message: error});
					});
				});
			},
			login: function(){
				var u = this.get('username');
				var p = this.get('password');
				var self = this;
				Ember.$.getJSON('api/login.php?username=' + u + '&password=' + p).then(function(data) {

					// login was successful, create a session
			    	var token = {sessionToken: data.sessionToken, user: data.objectId};
			    	localStorage.setItem('sessionToken', JSON.stringify(token));

			    	App.set('sessionToken', data.sessionToken);

					data.id = data.objectId;
			    	self.store.push('user', data);
			    	console.log(data);
			    	var user = self.store.find('user', data.id);
					self.transitionToRoute('user', user);
				});
			}
		}
	});

});