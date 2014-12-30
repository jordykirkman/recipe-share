define(
	// Dependencies
	[
		'ember',
		'emberdata',
	],
	
function() {

	App = Ember.Application.create({
	});

	Ember.$.ajaxPrefilter(function( options, oriOptions, jqXHR ) {
		var session = JSON.parse(localStorage.getItem('sessionToken'));
		// jqXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if(session){
			jqXHR.setRequestHeader('X-Parse-Session-Token', session.sessionToken);
		}
	});

	App.ApplicationAdapter = DS.RESTAdapter.extend({

		host: 'https://recipeboxapp.herokuapp.com',

		ajaxError: function(jqXHR) {

		    var error = this._super(jqXHR);

		    if (jqXHR && jqXHR.status === 400) {
		      var response = Ember.$.parseJSON(jqXHR.responseText),
		          errors = {};

		      if (response.errors !== undefined) {
		        var jsonErrors = response.errors;

		        Ember.EnumerableUtils.forEach(Ember.keys(jsonErrors), function(key) {

		          errors[Ember.String.camelize(key)] = jsonErrors[key];
		        });
		      }
		      return new DS.InvalidError(errors);
		    } else {
		      return error;
		    }
		}
	});

	App.IndexRoute = Ember.Route.extend({
		model: function(){
			var self = this;
			var token = JSON.parse(localStorage.getItem('sessionToken'));
			if(token === undefined || token === null) {
				this.transitionTo('login.index');
			} else {
				return this.store.find('user', token.user);
			}
		},
		setupController: function(controller, model){
			if(model){
				console.log(model);
				this.transitionTo('user', model);
			}
		}
	});

	App.Router.map(function() {

		this.resource('index', { path: "/" }, function(){

			this.resource('login', { path: "/login" }, function(){

			});

			this.resource('user', { path: "/user/:user_id" }, function(){

				this.route('newbook');

				this.resource('book', { path: "/book/:book_id" }, function(){

					this.route('newrecipe');

					this.resource('recipe', { path: "/recipe/:recipe_id" }, function(){


					});
				});
			});

		});

	});
	

});