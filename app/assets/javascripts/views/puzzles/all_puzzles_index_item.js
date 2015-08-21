Cruci.Views.AllPuzzlesIndexItem = Backbone.CompositeView.extend({

  template: JST['puzzles/all_puzzles_index_item'],

  tagName: 'li',

  className: 'all-puzzles-index-item',

  initialize: function (options) {
    this.listenTo(this.model,'sync',this.render);
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    return this;
  }

});
