Cruci.Views.PuzzleIndex = Backbone.CompositeView.extend({

  template: JST['puzzle_index'],

  initialize: function (options) {
    this.listenTo(this.collection,'sync',this.render);
  },

  render: function () {
    this.$el.html(this.template({puzzles: this.collection}));
    return this;
  }


});
