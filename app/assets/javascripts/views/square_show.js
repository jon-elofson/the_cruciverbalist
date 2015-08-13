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
    this.listenTo(this.model,"sync change:blackedout change:value change:ans_no ",
    this.render);
    this.puzzle = options.puzzle;
  },

  keys: {
    "down": 40,
    "up": 38,
    "left": 37,
    "right": 39,
    "space": 32
  },

  keyHandler: function (e) {
    e.stopPropagation();
    var pos = [this.model.get("posx"), this.model.get("posy")];
    var keys = this.keys;
    var newPos;
    if (e.keyCode === keys["down"]) {
      newPos = [pos[0]+1,pos[1]];
    } else if (e.keyCode === keys["up"]) {
      newPos = [pos[0]-1,pos[1]];
    } else if (e.keyCode === keys["left"]) {
      newPos = [pos[0],pos[1]-1];
    } else if (e.keyCode === keys["right"]) {
      newPos = [pos[0],pos[1]+1];
    }
    this.navigateEvent(newPos);
  },

  navigateEvent: function (newPos) {
    this.$el.trigger("navigate", [newPos]);
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
    this.model.save({},{
      success: function () {
        that.$el.trigger("newBlackSquare");
      }
    });
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
