Cruci.Views.PuzzleIndexItem = Backbone.CompositeView.extend({

  template: JST['puzzle_index_item'],

  tagName: 'li',

  className: 'puzzle-index-item',

  initialize: function () {
    this.listenTo(this.model,'sync',this.render);
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    return this;
  }

});
