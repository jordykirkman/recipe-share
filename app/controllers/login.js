import Ember from 'ember';

export default Ember.Controller.extend({

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
			Ember.$.getJSON('https://recipeboxapp.herokuapp.com/login?username=' + u + '&password=' + p).then(function(data) {

				// login was successful, create a session
				if(data){
			    	var token = {sessionToken: data.sessionToken, user: data.user.id};
			    	localStorage.setItem('sessionToken', JSON.stringify(token));
			    	// self.store.push('user', data.user);
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
