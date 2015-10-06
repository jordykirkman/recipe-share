import Ember from 'ember';

export default Ember.Helper.helper(function(params) {

	return params[0] ? params[0].replace(/\n/g, '<br>') : '';

});