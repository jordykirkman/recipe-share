import Ember from 'ember';

export default Ember.Route.extend({

	renderTemplate: function() {
		this.render({
			outlet: 'recipe',
		});
	},

	setupController: function(controller, model){
		// this resets the options display when a new recipe is selected
		controller.set('options', false);
		this._super(controller, model);
	}

});
