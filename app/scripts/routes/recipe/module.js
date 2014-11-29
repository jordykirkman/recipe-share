define(
	// Dependencies
	[
		'text!./template.html',
		// './views',
		// './controller',
		// './route',
		'./model',
		'./serializer',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:recipe', moduletemplate );

});