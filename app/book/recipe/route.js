import Ember from 'ember';

export default Ember.Route.extend({

	setupController: function(controller, model){
		controller.set('formattedIngredients', model.get('ingredients'));
		this._super(controller, model);
	},

	renderTemplate: function() {
		this.render({
			into: 'user',
			outlet: 'recipe',
		});
	}
	
});
