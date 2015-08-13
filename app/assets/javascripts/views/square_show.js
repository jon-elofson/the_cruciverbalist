Cruci.Views.SquareShow = Backbone.CompositeView.extend({

  template: JST['square_show'],

  events: {
    'click': 'toggleSelected',
    'dblclick': 'toggleBlack',
    'blur input': 'updateValue',
    'keydown': 'keyHandler'
  },

  tagName: "div",

  className: "grid-square",

  attributes: function() {
    return {
      'data-pos': [this.model.escape('posx'),this.model.escape('posy')]
    };
  },

  initialize: function (options) {
    this.listenTo(this.model,"sync change:blackedout change:value change:ans_no ",this.render);
  },

  render: function () {
    this.$el.html(this.template({square: this.model}));
    if ( this.model.escape('blackedout') === 'true' ) {
      this.$el.addClass('blacked-out');
    } else if (this.$el.hasClass('blacked-out')) {
      this.$el.removeClass('blacked-out');
    }
    return this;
  },

  toggleBlack: function () {
    if (this.model.escape('blackedout') === 'true') {
      this.model.set('blackedout','false');
    } else {
      this.model.set('blackedout','true');
    }
    var that = this;
    this.model.save();
  },

  updateValue: function () {
    var valData = this.$("input").serializeJSON();
    var new_val = valData.square.value;
    if (this.model.escape('val') !== new_val) {
      this.model.set('value',new_val);
      this.model.save();
    }
  },


});
