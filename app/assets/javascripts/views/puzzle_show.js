Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    'keydown': "keyHandler"
  },

  keys: {
    "down": 40,
    "up": 38,
    "left": 37,
    "right": 39,
    "space": 32
  },

  className: "puzzle-content",

  keyHandler: function (e) {
    var keys = this.keys;
    if (e.keyCode === keys["down"]) {
      this.moveDown();
    } else if (e.keyCode === keys["up"]) {
      this.moveUp();
    } else if (e.keyCode === keys["left"]) {
      this.moveLeft();
    } else if (e.keyCode === keys["right"]) {
      this.moveRight();
    }
  },

  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
    this.squares = this.model.squares();
    this.listenTo(this.model.squares,"add remove sync reset",this.render);
    this.$el.on('keydown', this.keyHandler);
  },

  addSquares: function () {
    var that = this;
    var width = this.model.escape('row_no') * 40;
    var height = this.model.escape('col_no') * 40;
    this.$(".puzzle-grid").width(width);
    this.$(".puzzle-grid").height(height);
    this.squares.each(function (square) {
      var view = new Cruci.Views.SquareShow({model: square});
      that.addSubview(".puzzle-grid",view);
    });
    return this;
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    this.addSquares();
    return this;
  },

  selectSquare: function (e) {
    if ($(this.$(".selected-square"))) {
      this.$(".square-form").remove();
      this.$(".selected-square").removeClass("selected-square");
    }
    $(e.currentTarget).addClass("selected-square");
  }


});
