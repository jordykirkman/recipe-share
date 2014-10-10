define(
	// Dependencies
	[
		'text!./template.html',
		'./application',
		'./controller',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:application', moduletemplate );

});