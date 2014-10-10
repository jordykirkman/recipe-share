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
		jqXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if(App.get('session')){
			jqXHR.setRequestHeader('X-Parse-Session-Token', App.get('session'));
		}
	});

	App.ApplicationAdapter = DS.RESTAdapter.extend({
		// outputs a different api endpoint depending on environment. get rid of this when we go live
		host: 'api',

		defaultSerializer: "DS/customRest",
	    findHasMany: function(store, record, url) {
	    	console.log(store);
	    	console.log(record);
	    	console.log(url);
		    return url;
		},
		buildURL: function(type, id) {
			var id = id ? "?id=" + id : "";
			return this._super(type) + '.php' + id;
		},
		// headers: {
		// 	"Content-Type": "application/json"
		// }

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

	DS.CustomRestSerializer = DS.RESTSerializer.extend({

		// hook for when a single record is retrived from a service
		extractSingle: function(store, type, payload, id, requestType) {
			var newObj = {};
			newObj[type] = payload;
			payload['id'] = payload.objectId;
			console.log(newObj);
			return this._super(store, type, newObj, id, requestType);
		},

	});



	App.RecipeSerializer = DS.RESTSerializer.extend({
		extractArray: function(store, type, payload, id, requestType) {
				// now our dota match history
				console.log(type);
				// var name = type.replace('App.', "");
				payload.results.forEach(function(object){
					object.id = object.objectId;
				});
				newObj = {};
				// newObj[name] = [];
				newObj["recipes"] = payload.results;
				console.log(store, type, payload, id, requestType);
			return this._super(store, type, newObj, id, requestType);
		}
	});

	DS.ErrorSerializer = DS.RESTSerializer.extend({

		// hook for when a single record is retrived from a service
		extractSingle: function(store, type, payload, id, requestType) {
			console.log('ahoy');
			return this._super(store, type, payload, id, requestType);
		},

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