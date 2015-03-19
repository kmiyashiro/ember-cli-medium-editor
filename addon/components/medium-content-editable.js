import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['contenteditable'],
  editable: true,
  isUserTyping: false,
  plaintext: false,
  classNames: ['editable'],
  contenteditable: (function() {
  var editable = this.get('editable');
    return editable ? 'true' : undefined;
  }).property('editable'),
  didInsertElement: function() {
    new MediumEditor(this.$(), {
      // Medium editor options Here
    });
    return this.setContent();
  },
  focusOut: function() {
    return this.set('isUserTyping', false);
  },
  keyDown: function(event) {
    if (!event.metaKey) {
      return this.set('isUserTyping', true);
    }
  },
  input: function() {
    if (this.get('plaintext')) {
      return this.set('value', this.$().text());
    } else {
      return this.set('value', this.$().html());
    }
  },
  render: function(buffer) {
    buffer.push((this.get('value') || null));
  },
  setContent: function() {
    var this_m = this;
    if (this_m.$()) {
      return this_m.$().html(this_m.get('value'));
    }
  }
});