import Ember from 'ember';

export default Ember.Route.extend({

	renderTemplate: function() {
		this.render({
			outlet: 'recipe',
		});
	},

	model: function(){
		if(this.get('controller.model') && this.get('controller.model.isNew') === true){
			return this.get('controller.model');
		} else {
			var user = this.modelFor('user');
			return this.store.createRecord('recipe', {
				name: "Your new recipe",
				creator: user
			});
		}
	},
	
});