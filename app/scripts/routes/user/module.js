define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
		'./route',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:user', moduletemplate );

});