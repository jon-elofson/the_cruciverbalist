Cruci.Views.SquareShow = Backbone.CompositeView.extend({

  template: JST['squares/square_show'],

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
    this.mode = options.mode;
    this.gameValue = '';
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
    this.$el.html(this.template({gameValue: this.gameValue, noStr: this.noStr(),
        mode: this.mode, square: this.model}));
    if ( this.model.escape('blackedout') === 'true' ) {
      this.$el.addClass('blacked-out');
    } else if (this.$el.hasClass('blacked-out')) {
      this.$el.removeClass('blacked-out');
    }
    return this;
  },

  toggleBlack: function () {
    if (this.mode === "play" || this.$el.hasClass('toggled') ) {return;}
    if (this.model.get('blackedout') === true) {
      this.model.set('blackedout',false);
    } else {
      this.model.set('blackedout',true);
    }
    var position = [this.model.get('posx'),this.model.get('posy')];
    this.$el.addClass('toggled');
    this.$el.trigger('toggledBlack');
  },

  updateValue: function () {
    var valData = this.$("input").serializeJSON();
    if (this.mode === 'edit') {
      var new_val = valData.square.value.toUpperCase();
      this.model.set('value',new_val);
      this.$el.trigger('updateClues');
    } else {
      this.gameValue = valData.tempsq.value.toUpperCase();
    }
    this.render();
  },


});
