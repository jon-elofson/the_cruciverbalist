Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzle_show'],

  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
    this.squares = this.model.squares();
    this.listenTo(this.squares,"sync",this.render);
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    this.squares.each(function (square) {
      var view = new Cruci.Views.SquareShow({model: square});
      this.addSubview(".puzzle-grid",view);
    });
    return this;
  },

});
