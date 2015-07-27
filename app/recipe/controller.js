import Ember from 'ember';

export default Ember.Controller.extend({

	edit: false,
	actions: {
		removeFromBook: function(){
			book.get('recipes').then(function(recipes){
				book.removeObject('recipe').save().then(function(book){
					alert('Recipe removed from book' + book);
				});
			});
		},
		save: function(recipe){
			this.get('model').save().then(function(recipe){
				alert('Recipe updated.');
			});
		},
	}
	
});
