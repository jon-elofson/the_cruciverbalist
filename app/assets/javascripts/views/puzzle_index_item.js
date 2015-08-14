Cruci.Views.PuzzleIndexItem = Backbone.CompositeView.extend({

  template: JST['puzzle_index_item'],

  tagName: 'li',

  className: 'puzzle-index-item',

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    return this;
  }

});
