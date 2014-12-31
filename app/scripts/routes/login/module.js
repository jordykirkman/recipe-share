define(
	// Dependencies
	[
		'text!./template.html',
		'./views',
		'./controller',
		'./route',
		'./model',
		'./serializer',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:login', moduletemplate );

	App.register( 'template:login.error', Ember.Handlebars.compile('\
		<span class="alert">{{model.error}}</span>\
	') );

});