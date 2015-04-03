import Ember from 'ember';

export default Ember.Controller.extend({

	actions: {
		saveBook: function(){
			var model = this.get('model');
			var user = this.get('user');
			var self = this;

			// save the book
			model.save().then(function(book){
				
				user.get('books').addObject(book);

				self.transitionToRoute('book', book);

			});
		}
	}
	
});
