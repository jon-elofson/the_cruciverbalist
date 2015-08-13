Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    'keydown': "keyHandler",
    'navigate': 'handleNavigate',
    'newBlackSquare': 'handleNewBlackSquare'
  },


  className: "puzzle-content",

  handleNavigate: function (event, pos) {
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

  initialize: function (options) {
    this.collection = new Cruci.Collections.Squares();
    this.listenTo(this.model,"sync",this.render);
    this.listenTo(this.collection, 'sync', this.render.bind(this));
    this.squares = this.model.squares();
  },

  addSquares: function () {
    var that = this;
    var height = this.model.get('row_no') * 40;
    var width = this.model.get('col_no') * 40;
    this.$(".puzzle-grid").width(width);
    this.$(".puzzle-grid").height(height);
    this.squares.each(function (square) {
      that.collection.add(square);
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
  },


});
