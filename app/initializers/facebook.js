// export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
// }

export default {
	name: 'facebook',
	initialize: function(container, application) {
	var fbAsyncInit = function() {
		FB.init({
			appId		: '1662676217287124',
			xfbml		: true,
			version		: 'v2.4'
		});
		// FB.getLoginStatus(function(response) {
		// 	if(response.status === 'connected'){
		// 		var headers = {"X-Parse-Session-Token": response.authResponse.accessToken};
		// 		application.set('globalHeaders', headers);
		// 	}
		// });
	};
 
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
 
	window.fbAsyncInit = fbAsyncInit;
   }
};
