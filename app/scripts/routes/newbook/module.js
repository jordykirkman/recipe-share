define(
	// Dependencies
	[
		'text!./template.html',
		'./controller',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:user.newbook', moduletemplate );

});