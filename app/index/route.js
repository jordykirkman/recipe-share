import Ember from 'ember';

export default Ember.Route.extend({

	activate: function(controller, model){
		var route = this;
		var token = localStorage.sessionToken ? JSON.parse(localStorage.sessionToken) : undefined;
		if(token){
			if(token.authData){
				Ember.run.later(function(){
					FB.getLoginStatus(function(response) {
						if(response.status === 'connected'){
							console.log(response);
						
							var expiration = moment(response.authResponse.expiresIn, 'X').format();
							var authData = {'facebook': {}};
							authData['facebook']['id'] = response.authResponse.userID;
							authData['facebook']['access_token'] = response.authResponse.accessToken;
							authData['facebook']['expiration_date'] = expiration;
							var newUser = JSON.stringify({user: {authData: authData}});
							Ember.$.ajax('api/users', {
								type: 'POST',
								data: newUser,
								contentType: 'application/json',
								success: function(response){
									var user = JSON.parse(response);
									console.log(user);
									route.store.pushPayload('user', user);
									route.transitionTo('user', user.user.id);
								}
							});
						}
					});
				}, 1000);
			} else if(token.sessionToken){
		    	route.store.find('user', token.user).then(function(user){
		    		route.transitionTo('user', user);
		    	});
			}
		}
	}

});
