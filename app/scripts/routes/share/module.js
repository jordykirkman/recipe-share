define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
		'./route',
		'ember',
		'scripts/routes/application/application',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:book.index', moduletemplate );

});