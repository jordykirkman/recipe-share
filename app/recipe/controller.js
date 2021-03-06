import Ember from 'ember';

export default Ember.Controller.extend({

	needs: ['user'],

	edit: false,
	options: false,
	actions: {
		optionsToggle: function(){
			this.toggleProperty('options');
		},

		removeFromBook: function(){
			// book.get('recipes').then(function(recipes){
			// 	book.removeObject('recipe').save().then(function(book){
			// 		alert('Recipe removed from book' + book);
			// 	});
			// });
		},

		save: function(recipe){
			this.get('model').save().then(function(recipe){
				alert('Recipe updated.');
			});
		},

		copyToBook: function(book){
			var recipe = this.get('model');
			book.get('recipes').pushObject(recipe);
			book.save().then(function(book){
				console.log('saved');
			});
		}

	}
	
});
