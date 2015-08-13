Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    'navigate': 'handleNavigate',
  },

  className: "puzzle-content",

  handleNavigate: function (pos) {
    var width = this.model.get('col_no');
    if (pos) {
      var newPos = (pos[0] * width) + pos[1];
      var $newSquare = this.$el.find('.grid-square').eq(newPos);
      if ($newSquare) {
        this.$('.selected-square').removeClass('selected-square');
        $newSquare.addClass("selected-square");
        $newSquare.find("input").focus();
      }
    }
  },

  keys: {
    "down": 40,
    "up": 38,
    "left": 37,
    "right": 39,
    "space": 32
  },

  keyHandler: function (e) {
    var pos = this.$('.selected-square').data('pos');
    pos = pos.split(",").map(function (el) {
      return parseInt(el);
    });
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
    this.handleNavigate(newPos)
  },


  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
    $("body").on("keydown",this.keyHandler.bind(this));
    this.squares = this.model.squares();
  },

  addSquares: function () {
    var that = this;
    var height = this.model.get('row_no') * 40;
    var width = this.model.get('col_no') * 40;
    this.$(".puzzle-grid").width(width);
    this.$(".puzzle-grid").height(height);
    this.squares.each(function (square) {
      var view = new Cruci.Views.SquareShow({model: square});
      that.addSubview(".puzzle-grid",view);
    });
    return this;
  },

  addAcrossAnswers: function () {

  },

  addDownAnswers: function () {

  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    this.addSquares();
    this.addAnswers();
    return this;
  },

  selectSquare: function (e) {
    if ($(this.$(".selected-square"))) {
      this.$(".square-form").remove();
      this.$(".selected-square").removeClass("selected-square");
    }
    $(e.currentTarget).addClass("selected-square");
  },


});
