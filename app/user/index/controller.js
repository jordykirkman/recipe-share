import Ember from 'ember';

export default Ember.Controller.extend({

	userController: Ember.inject.controller('user'),

	bookInvites: function(){
		var user = this.get('userController.model');
		return this.store.filter('book', function(book){
			if(book.get('userInvites').contains(user)){
				return book;
			}
		});
	}.property(),

	actions: {

		respondToBookInvite: function(book, user, res){
			if(res === true){
				book.get('users').addObject(user);
				book.get('userInvites').removeObject(user);
				// book.save();
			} else {
				book.get('userInvites').removeObject(user);
				// book.save();
			}
		}

	}

});
