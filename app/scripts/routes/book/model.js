define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.Book = DS.Model.extend({
		name: DS.attr('string'),

		recipes: DS.hasMany('recipe', { async: true })
	});

});