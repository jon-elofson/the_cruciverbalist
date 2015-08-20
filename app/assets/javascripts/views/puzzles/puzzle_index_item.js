Cruci.Views.PuzzleIndexItem = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_index_item'],

  tagName: 'li',

  className: 'puzzle-index-item',

  initialize: function (options) {
    this.listenTo(this.model,'sync',this.render);
    this.icon = options.icon;
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model, icon: this.icon}));
    return this;
  }

});
