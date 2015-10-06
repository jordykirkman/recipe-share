import DS from 'ember-data';

export default DS.Model.extend({

	username: DS.attr('string'),
	facebookUser: DS.attr('string'),

	authData: DS.attr(),

	// books: DS.hasMany('book', {
	// 	inverse: 'users',
	// 	async: true
	// })
  
});
