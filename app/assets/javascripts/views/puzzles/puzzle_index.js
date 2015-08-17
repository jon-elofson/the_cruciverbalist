Cruci.Views.PuzzleIndex = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_index'],

  initialize: function (options) {
    this.listenTo(this.collection,'sync add remove',this.render);
    this.mode = options.mode;
  },

  render: function () {
    this.$el.html(this.template({puzzles: this.collection}));
    this.addPuzzleIndexItems();
    return this;
  },

  addPuzzleIndexItems: function () {
    var that = this;
    this.collection.each(function (puzzle) {
      var view = new Cruci.Views.PuzzleIndexItem({model: puzzle, mode: this.mode});
      that.addSubview('.puzzle-index-items',view);
    });
  }


});
