import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

	classNameBindings: ['checked:checked'],

	checked: function(){
		return this.get('contextList').contains(this.get('model'));
	}.property('model', 'contextList.length'),

	actions: {
		select: function(){
			var checked = this.get('checked');
			if(checked === false){
				this.get('contextList').addObject(this.get('model'));
			} else {
				this.get('contextList').removeObject(this.get('model'));
			}
		}
	},

	layout: layout

});
