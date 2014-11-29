define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.Recipe = DS.Model.extend({
		name: DS.attr('string'),
		description: DS.attr('string'),
		instructions: DS.attr('string'),
		ingredients: DS.attr('string'),
		tags: DS.attr('string'),
		image: DS.attr('string'),
		deleted: DS.attr('boolean'),
	});

});