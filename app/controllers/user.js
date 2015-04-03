import Ember from 'ember';

export default Ember.Controller.extend({

	actions: {
		logout: function(){

			localStorage.removeItem('sessionToken');

			this.transitionToRoute('login');

		},
		save: function(){
			this.get('model').save().then(function(user){
				alert('Changes saved.')
			});
		}
	}
	
});
