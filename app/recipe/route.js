import Ember from 'ember';

export default Ember.Route.extend({

	setupController: function(controller, model){
		var book = this.modelFor('book');
		controller.setProperties({
			'model': model,
			'book': book
		});
	}
	
});
