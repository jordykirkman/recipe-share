import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({

	// host: 'https://recipeboxapp.herokuapp.com',
	host: 'api',

	headers: function(){
		var headers = {};
		headers['X-Parse-Master-Key'] = '16J8JcA01nk476MPuG7Tcon9iTKe8tNGai4o4Mvy';

		var token = localStorage.getItem('sessionToken');
		if(token){
			headers['X-Parse-Session-Token'] = JSON.parse(token).sessionToken;
		}
		
		return headers;
	}.property(),

	// ajaxError: function(jqXHR) {

	//     var error = this._super(jqXHR);

	//     if (jqXHR && jqXHR.status === 400) {
	//       var response = Ember.$.parseJSON(jqXHR.responseText),
	//           errors = {};

	//       if (response.errors !== undefined) {
	//         var jsonErrors = response.errors;

	//         Ember.EnumerableUtils.forEach(Ember.keys(jsonErrors), function(key) {

	//           errors[Ember.String.camelize(key)] = jsonErrors[key];
	//         });
	//       }
	//       return new DS.InvalidError(errors);
	//     } else {
	//       return error;
	//     }
	// }
	
});
