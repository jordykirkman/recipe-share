import DS from 'ember-data';

export default DS.Model.extend({
  
	name: DS.attr('string'),
	description: DS.attr('string'),
	instructions: DS.attr('string'),
	ingredients: DS.attr('string'),
	tags: DS.attr('string'),
	image: DS.attr('string'),
	deleted: DS.attr('boolean'),
	creator: DS.belongsTo('user', {async: true}),
	books: DS.hasMany('book', {
		// inverse: 'recipes',
		async: true
	})
  
});
