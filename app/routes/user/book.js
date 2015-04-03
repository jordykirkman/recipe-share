import Ember from 'ember';

export default Ember.Route.extend({

	name: DS.attr('string'),
	description: DS.attr('string'),

	users: DS.hasMany('user', { async: true }),
	recipes: DS.hasMany('recipe', { async: true })
	
});
