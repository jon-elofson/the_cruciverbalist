Cruci.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'goHome',
    'puzzles/new': 'newPuzzle',
    'puzzles/:id/play': 'playPuzzle',
    'puzzles/:id/edit': 'editPuzzle'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.userId = parseInt(Cruci.CURRENT_USER_ID);
    this.collection = options.collection;
  },

  goHome: function () {
    var view = new Cruci.Views.HomeView({collection: this.collection});
    this._swapView(view);
  },

  newPuzzle: function () {
    var newPuzzle = new Cruci.Models.Puzzle();
    var view = new Cruci.Views.PuzzleForm({model: newPuzzle,
      collection: this.collection});
    this._swapView(view);
  },

  playPuzzle: function (id) {
    var thisPuzzle = this.collection.getOrFetch(id);
    var games = thisPuzzle.games();
    var view = new Cruci.Views.PuzzleShow({model: thisPuzzle, games: games,
        mode: 'play', userId: this.userId});
    this._swapView(view);
  },

  editPuzzle: function (id) {
    var thisPuzzle = this.collection.getOrFetch(id);
    var view = new Cruci.Views.PuzzleShow({model: thisPuzzle, mode: 'edit'});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(this._view.render().$el);
  },


});
