import Ember from 'ember';

export default Ember.Component.extend({
	attributeBindings:['version', 'xmlns', 'viewBox', 'xmlns:xlink', 'width', 'height'],
	classNames: ['icon'],
	tagName: "svg",
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: function(){
		var size = this.get('size');
		switch(size){
			case "small":
				return "2 -3 12 22";
				break;
			case "medium":
				return "2 -2 12 22";
				break;
			case "large":
				return "2 -2 12 22";
				break;
			default:
				return "2 -2 12 22";
		}
	}.property('size'),
	width: function(){
		var size = this.get('size');
		switch(size){
			case "small":
				return "30px";
				break;
			case "medium":
				return "45px";
				break;
			case "large":
				return "65px";
				break;
			default:
				return "45px";
		}
	}.property('size'),
	height: function(){
		var size = this.get('size');
		switch(size){
			case "small":
				return "30px";
				break;
			case "medium":
				return "45px";
				break;
			case "large":
				return "65px";
				break;
			default:
				return "45px";
		}
	}.property('size'),
	type: null,

	icon: function(){
		var type = this.get('type');
		return this.get(type);
	}.property('type'),

	books: new Ember.Handlebars.SafeString('<path d="M3.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM3 5h-2v-1h2v1z"></path>\
<path d="M8.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM8 5h-2v-1h2v1z"></path>\
<path d="M11.954 2.773l-2.679 1.35c-0.246 0.124-0.345 0.426-0.222 0.671l4.5 8.93c0.124 0.246 0.426 0.345 0.671 0.222l2.679-1.35c0.246-0.124 0.345-0.426 0.222-0.671l-4.5-8.93c-0.124-0.246-0.426-0.345-0.671-0.222z"></path>'),

	pencil: new Ember.Handlebars.SafeString('<path d="M13.5 0c1.381 0 2.5 1.119 2.5 2.5 0 0.563-0.186 1.082-0.5 1.5l-1 1-3.5-3.5 1-1c0.418-0.314 0.937-0.5 1.5-0.5zM1 11.5l-1 4.5 4.5-1 9.25-9.25-3.5-3.5-9.25 9.25zM11.181 5.681l-7 7-0.862-0.862 7-7 0.862 0.862z"></path>'),

	filter: new Ember.Handlebars.SafeString('<path d="M8 0c-4.418 0-8 1.119-8 2.5v1.5l6 6v5c0 0.552 0.895 1 2 1s2-0.448 2-1v-5l6-6v-1.5c0-1.381-3.582-2.5-8-2.5zM1.475 2.169c0.374-0.213 0.9-0.416 1.52-0.586 1.374-0.376 3.152-0.583 5.005-0.583s3.631 0.207 5.005 0.583c0.62 0.17 1.146 0.372 1.52 0.586 0.247 0.141 0.38 0.26 0.442 0.331-0.062 0.071-0.195 0.19-0.442 0.331-0.374 0.213-0.9 0.416-1.52 0.586-1.374 0.376-3.152 0.583-5.005 0.583s-3.631-0.207-5.005-0.583c-0.62-0.17-1.146-0.372-1.52-0.586-0.247-0.141-0.38-0.26-0.442-0.331 0.062-0.071 0.195-0.19 0.442-0.331z"></path>'),

	spoonKnife: new Ember.Handlebars.SafeString('<path d="M3.5 0c-1.657 0-3 1.567-3 3.5 0 1.655 0.985 3.042 2.308 3.406l-0.497 8.096c-0.034 0.549 0.389 0.998 0.939 0.998h0.5c0.55 0 0.972-0.449 0.939-0.998l-0.497-8.096c1.323-0.365 2.308-1.751 2.308-3.406 0-1.933-1.343-3.5-3-3.5zM13.583 0l-0.833 5h-0.625l-0.417-5h-0.417l-0.417 5h-0.625l-0.833-5h-0.417v6.5c0 0.276 0.224 0.5 0.5 0.5h1.302l-0.491 8.002c-0.034 0.549 0.389 0.998 0.939 0.998h0.5c0.55 0 0.972-0.449 0.939-0.998l-0.491-8.002h1.302c0.276 0 0.5-0.224 0.5-0.5v-6.5h-0.417z"></path>'), 

});

