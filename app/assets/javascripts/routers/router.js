Cruci.Routers.Router = Backbone.Router.extend({

  routes: {
    '': 'goHome',
    'puzzles/new': 'newPuzzle',
    'puzzles/:id': 'playPuzzle',
    'puzzles/:id/edit': 'editPuzzle'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.userId = parseInt(Cruci.CURRENT_USER_ID);
    this.collection = options.collection;
    this.games = options.games;
    this.games.fetch();
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
    var game = this.games.fetchByPuzzle(id);

    var that = this;
    // if (!game) {
    //   var newGame = new Cruci.Models.Game({puzzle_id: id,user_id: this.userId,
    //   puzzle: thisPuzzle});
    //   newGame.save({},{
    //     success: function () {
    //       var view = new Cruci.Views.PuzzleShow({model: thisPuzzle, game: newGame,
    //         mode: 'play'});
    //       that._swapView(view);
    //     }
    //   });
    // } else {
      var view = new Cruci.Views.PuzzleShow({model: thisPuzzle, game: game,
        mode: 'play'});
      this._swapView(view);
    // }
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
