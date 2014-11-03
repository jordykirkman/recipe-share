define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
		'./route',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:book.newrecipe', moduletemplate );

});