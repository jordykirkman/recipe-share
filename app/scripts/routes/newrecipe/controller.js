define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.BookNewrecipeController = Ember.Controller.extend({
		actions: {
			saveRecipe: function(){
				var model = this.get('model');
				var book = this.get('book');
				var self = this;

				// save the recipe
				model.save().then(function(recipe){
					book.get('recipes').addObject(recipe).then(function(){
						book.save();
						self.transitionToRoute('recipe', recipe);
					});
				});
			}
		}
	});

	App.UploadFile = Ember.TextField.extend({
		tagName: 'input',
		attributeBindings: ['name'],
		type: 'file',
		change: function (e) {
		    var reader = new FileReader(), 
		    that = this;        
		    reader.onload = function (e) {
		        var file = e.target.result;
		        Ember.run(function() {
		            that.set('value', file);
		        });            
		    };
		    return reader.readAsDataURL(e.target.files[0]);
		}
	});

});