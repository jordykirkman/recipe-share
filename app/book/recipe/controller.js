import Ember from 'ember';

export default Ember.Controller.extend({

	userController: Ember.inject.controller('user'),

	edit: false,
	options: false,

	units: {
		gallon: {'double': 2, 'half': 0.5},
		gallons: {'double': 2, 'half': 0.5},
		quart: {'double': 2, 'half': 'pint'},
		quarts: {'double': 2, 'half': 'pint'},
		pint: {'double': 'quart', 'half': 'cup'},
		cup: {'double': 'pint', 'half': 0.5},
		cups: {'double': 'pint', 'half': 0.5},
		tbs: {'double': 2, 'half': 0.5},
		tablespoons: {'double': 2, 'half': 0.5},
		tablespoon: {'double': 2, 'half': 0.5},
		tsp: {'double': 2, 'half': 0.5},
		teaspoon: {'double': 2, 'half': 0.5},
		teaspoons: {'double': 2, 'half': 0.5},
	},

	verbs: {
		'double': 2,
		'single': 1,
		'half': 0.5
	},

	actions: {

		changeQuantity: function(number){
			var controller = this;
			var unitLibrary = this.get('units');
			var literalNumber = this.get('verbs')[number];

			var ingredients = this.get('model.ingredients').split('\n');

			// uses the a recursive molulo function to find the greatest common divisor
			var convertToFraction = function(decimal){

				// find the greatest common divisor
				var gcd = function(num, den) {
					// run this recursively until we cant anymore
					if (den < 0.0000001) return num;
					return gcd(den, Math.floor(num % den));
				};

				// ex: 0.5 === 1
				var len = decimal.toString().length - 2;
				// ex: 10 to the 1 power
				var denominator = Math.pow(10, len);
				// ex: 0.5 * 10 === 5
				var numerator = decimal * denominator;
				// 5 % 10 === 2 how many times does 5 go into ten?
				var divisor = gcd(numerator, denominator);
				// 5 / 2 === 2.5
				numerator /= divisor;
				// 10 / 2 === 5
				denominator /= divisor;

				return Math.floor(numerator) + '/' + Math.floor(denominator);
			}

			var newIngredients = ingredients.map(function(ingredient){
				var sentance = ingredient.split(' ');
				var quantity = sentance[0];
				var unit = sentance[1].toLowerCase();

				// console.log(quantity, unit, unitLibrary[unit]);

				if(unitLibrary[unit]){
					var newNum = number === 'single' ? 1 : unitLibrary[unit][number];

					if(isNaN(newNum)){
						sentance[1] = newNum;
					} else {
						sentance[0] = newNum * quantity < 1 ? convertToFraction(newNum * quantity) : newNum * quantity;
					}
				} else {
					sentance[0] = literalNumber * quantity < 1 ? convertToFraction(literalNumber * quantity) : literalNumber * quantity;
				}

				return sentance.join(' ');

			});
			// console.log(newIngredients);

			this.set('formattedIngredients', newIngredients.join('\n'));
			
		},

		optionsToggle: function(){
			this.toggleProperty('options');
		},

		removeFromBook: function(){
			// book.get('recipes').then(function(recipes){
			// 	book.removeObject('recipe').save().then(function(book){
			// 		alert('Recipe removed from book' + book);
			// 	});
			// });
		},

		save: function(recipe){
			this.get('model').save().then(function(recipe){
				alert('Recipe updated.');
			});
		},

		copyToBook: function(book){
			var recipe = this.get('model');
			book.get('recipes').pushObject(recipe);
			book.save().then(function(book){
				console.log('saved');
			});
		}

	}
	
});
