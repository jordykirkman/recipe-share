import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['ingredient-component'],

	classNameBindings: ['crossedOutDisplay'],

	crossedOutDisplay: function(){
		return this.get('crossedOut') === true ? 'crossedOut' : '';
	}.property('crossedOut'),

	click: function(){
		this.toggleProperty('crossedOut');
	}

});
