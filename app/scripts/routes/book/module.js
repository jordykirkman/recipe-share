define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
		'./model',
		'./serializer',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:book', moduletemplate );

});