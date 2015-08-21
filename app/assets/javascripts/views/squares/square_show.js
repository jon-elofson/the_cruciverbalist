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
    this.mode = options.mode;
    this.findIfBlack();
    this.gameValue = this.model.get('gameValue');
    this.listenTo(this.model,"sync change:value change:ans_no change:gameValue", this.render);
  },

  noStr: function () {
    var acrossNo = this.model.get('across_ans_no');
    var downNo = this.model.get('down_ans_no');
    if (acrossNo) {
      return acrossNo;
    } else if (downNo) {
      return downNo;
    }
    return null;
  },

  nameStr: function () {
    if (this.mode === "play") {
      return "tempsq[value]";
    } else {
      return "square[value]";
    }
  },

  valueStr: function () {
    if (this.mode === "edit") {
      return "<%=square.escape('value')%>";
    } else {
      return "<%=gameValue%>";
    }
  },

  classStr: function () {
    if (this.noStr()) {
      return "square-val with-no";
    } else {
      return "square-val";
    }
  },


  render: function () {
    this.undelegateEvents();
    this.$el.html(this.template({gameValue: this.gameValue, noStr: this.noStr(),
        nameStr: this.nameStr(), classStr: this.classStr(), square: this.model,
        mode: this.mode}));
    this.delegateEvents();
    return this;
  },

  toggleBlack: function () {
    if (this.mode === "play" || this.$el.hasClass('toggled') ) {return;}
    if (this.model.get('blackedout') === true) {
      this.$el.removeClass('blacked-out');
      this.model.set('blackedout',false);
    } else {
      this.$el.addClass('blacked-out');
      this.model.set('blackedout',true);
    }
    var position = [this.model.get('posx'),this.model.get('posy')];
    this.$el.addClass('toggled');
    this.$el.trigger('toggledBlack');
  },

  findIfBlack: function () {
    if (this.model.get('blackedout') === true) {
      this.$el.addClass('blacked-out');
    } else {
      this.$el.removeClass('blacked-out');
    }
  },

  updateValue: function () {
    var valData = this.$("input").serializeJSON();
    if (this.mode === 'edit') {
      var new_val = valData.square.value.toUpperCase();
      this.model.set('value',new_val);
      this.$el.trigger('updateClues');
    } else {
      this.gameValue =  valData.tempsq.value.toUpperCase();
      this.model.set('gameValue', this.gameValue);
    }
  },




});
