define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.User = DS.Model.extend({
		username: DS.attr('string'),
		password: DS.attr('string'),
		email: DS.attr('string'),
		sessionToken: DS.attr('string'),
		updatedAt: DS.attr('string'),

		books: DS.hasMany('book', { async: true })
	});

	App.Recipe = DS.Model.extend({
		name: DS.attr('string'),
		description: DS.attr('string'),
		instructions: DS.attr('string'),
		ingredients: DS.attr('string'),
	});

});