import Ember from 'ember';

export default Ember.Component.extend({
	/*
		attributes that should be bound in template:
		target - the value we intend to set by clicking this component
		value - the value to set the target to
	*/
	classNameBindings: ['active'],

	active: function(){
		return this.get('target') === this.get('value') ? 'active' : '';
	}.property('target', 'value'),

	click: function(){
		var target = this.get('target');
		var value = this.get('value');
		if(target !== value){
			this.set('target', value);
		}
	}


});
