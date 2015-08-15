Cruci.Views.SquareShow = Backbone.CompositeView.extend({

  template: JST['square_show'],

  events: {
    'click': 'toggleSelected',
    'dblclick': 'toggleBlack',
    'blur input': 'updateValue',
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

  noStr: function () {
    var acrossNo = this.model.get('across_ans_no');
    var downNo = this.model.get('down_ans_no');
    if (acrossNo) {
      return acrossNo;
    } else if (downNo) {
      return downNo;
    }
  },

  render: function () {
    this.$el.html(this.template({square: this.model, noStr: this.noStr()}));
    if ( this.model.escape('blackedout') === 'true' ) {
      this.$el.addClass('blacked-out');
    } else if (this.$el.hasClass('blacked-out')) {
      this.$el.removeClass('blacked-out');
    }
    return this;
  },

  toggleBlack: function () {
    if (this.model.get('blackedout') === true) {
      this.model.set('blackedout',false);
    } else {
      this.model.set('blackedout',true);
    }
    this.$el.trigger('toggledBlack');
  },

  updateValue: function () {
    var valData = this.$("input").serializeJSON();
    var new_val = valData.square.value.toUpperCase();
    this.model.set('value',new_val);
    this.render();
    this.$el.trigger('updateAnswers');
  },


});
