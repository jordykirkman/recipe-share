define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	// App.UserSerializer = DS.RESTSerializer.extend({
	// 	extractSingle: function(store, type, payload, id, requestType) {
	// 		// var newObj = {};
	// 		// newObj["user"] = payload;
	// 		// newObj["user"]["id"] = payload.objectId;
	// 		console.log(payload);
	// 		return this._super(store, type, payload, id, requestType);
	// 	},
		// extractArray: function(store, type, payload, id, requestType) {
		// 		// now our dota match history
				
		// 		// var name = type.replace('App.', "");
		// 		payload.results.forEach(function(object){
		// 			object.id = object.objectId;
		// 		});
		// 		newObj = {};
				
		// 		newObj["users"] = payload.results;
		// 		console.log(newObj);
		// 	return this._super(store, type, newObj, id, requestType);
		// }
	// });

});