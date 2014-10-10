define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:book.newrecipe', moduletemplate );

});