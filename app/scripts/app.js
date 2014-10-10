requirejs.config({

	// this will append the timestamp to all scripts and remove caching
	urlArgs: '0.1',

    //By default load any module IDs from /lib
    baseUrl: '/',
    paths: {
    	//shorthand paths to scripts
        app: 				'scripts/app',
		jquery: 			'scripts/libs/jquery-1.10.2',
		handlebars: 		'scripts/libs/handlebars-v1.3.0',
		ember: 				'scripts/libs/ember-1.7.0',
		emberdata: 			'scripts/libs/ember-data',
		text: 				'scripts/libs/text',
    },
	shim: {
		//scripts that cant be wrapped in a define function that have dependancies
		'ember': {
			deps: ['jquery', 'handlebars']
		},
		'emberdata': {
			deps: ['ember']
		}
	}
});


define(
	// Dependencies
	[
		'require',
		'ember',
		'scripts/routes/application/module',
		'scripts/routes/login/module',
		'scripts/routes/user/module',
		'scripts/routes/newbook/module',
		'scripts/routes/book/module',
		'scripts/routes/recipe/module',
		'scripts/routes/newrecipe/module',
	],

	function() {

	// create a loading route!
	App.LoadingRoute = Ember.Route.extend();

	var LoadTemplate = Ember.Handlebars.compile('<div class="loading"><h3>Loading data...</h3><img src="../images/loading.gif"/></div>');
	App.register( 'template:loading', LoadTemplate );

});