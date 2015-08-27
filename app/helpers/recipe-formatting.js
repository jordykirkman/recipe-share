import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
	
	return Ember.String.htmlSafe( params[0].replace(/\n/g, '<br>') );

});