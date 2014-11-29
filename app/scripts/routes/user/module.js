define(
	// Dependencies
	[
		'text!./user.html',
		'text!./user-index.html',
		'./controller',
		'./serializer',
		'./route',
		'ember',
	],
	
	function(template, index) {

	// primary template
	var moduletemplate = Ember.Handlebars.compile(template);
	App.register( 'template:user', moduletemplate );

	// route.index template
	var indextemplate = Ember.Handlebars.compile(index);
	App.register( 'template:user.index', indextemplate );

});