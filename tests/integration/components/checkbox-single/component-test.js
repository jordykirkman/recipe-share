import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('checkbox-single', 'Integration | Component | checkbox single', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{checkbox-single}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#checkbox-single}}
      template block text
    {{/checkbox-single}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
