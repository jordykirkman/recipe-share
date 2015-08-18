import DS from 'ember-data';

export default DS.Model.extend({
  
	name: DS.attr('string'),
	description: DS.attr('string'),
	instructions: DS.attr('string'),
	ingredients: DS.attr('string'),
	tags: DS.attr('string'),
	image: DS.attr('string'),
	deleted: DS.attr('boolean'),
	books: DS.hasMany('book', { async: true })
  
});
