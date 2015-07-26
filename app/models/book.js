import DS from 'ember-data';

export default DS.Model.extend({

	name: DS.attr('string'),
	description: DS.attr('string'),

	users: DS.hasMany('user', { async: true }),
	recipes: DS.hasMany('recipe', { async: true })
  
});
