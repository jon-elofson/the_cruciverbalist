Cruci.Views.AllGamesIndexItem = Backbone.CompositeView.extend({

  template: JST['puzzles/all_games_index_item'],

  tagName: 'li',

  className: 'all-puzzles-index-item',

  initialize: function (options) {
    this.listenTo(this.model,'sync',this.render);
    this.puzzle = options.puzzle;
  },

  lastPlayed: function () {
    var updated = this.model.get('updated_at');
    var date = new Date(Date.parse(updated));
    return date.toDateString();

  },

  render: function () {
    this.$el.html(this.template({game: this.model, puzzle: this.puzzle,
      lastPlayed: this.lastPlayed()}));
    return this;
  }

});
