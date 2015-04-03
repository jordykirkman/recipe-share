import DS from 'ember-data';

export default DS.Model.extend({

	username: DS.attr('string'),
	password: DS.attr('string'),
	email: DS.attr('string'),
	sessionToken: DS.attr('string'),
	updatedAt: DS.attr('string'),
	error: DS.attr('string'),

	books: DS.hasMany('book', {inverse: 'users'})
  
});
