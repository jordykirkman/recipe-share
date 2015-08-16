import Ember from 'ember';

export default Ember.Route.extend({

	renderTemplate: function() {
		this.render({
			outlet: 'recipe',
		});
	},

	model: function(){
		return this.modelFor('user');
	}

});
