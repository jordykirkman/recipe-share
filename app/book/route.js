import Ember from 'ember';

export default Ember.Route.extend({

	renderTemplate: function() {
		this.render({
			outlet: 'book',
		});
	},
	deactivate: function(){
		this.controllerFor('book').set('model', null);
	}

});
