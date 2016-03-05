import Ember from 'ember';

export default Ember.Component.extend({

	classNameBindings: ['checked:checked'],

	checked: function(){
		return this.get('contextList').contains(this.get('model')) ? 'checked' : '';
	}.property('model', 'contextList.@each.isFulfilled'),

	actions: {
		select: function(){
			var checked = this.get('checked');
			if(checked !== 'checked'){
				this.get('contextList').addObject(this.get('model'));
			} else {
				this.get('contextList').removeObject(this.get('model'));
			}
		}
	}

});
