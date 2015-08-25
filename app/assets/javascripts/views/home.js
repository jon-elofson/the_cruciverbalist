Cruci.Views.HomeView = Backbone.CompositeView.extend({

  template: JST['home'],

  events: {
    "click .new-puzzle-button": "newPuzzle",
    "reRender": "render",
    'click .home-div.play-todays-puzzle': 'todaysPuzzle',
    'click .find-puzzle-button': 'findPuzzle',
    'click .play-puzzle': 'playPuzzle',
    'click .delete-puzzle': 'deletePuzzle',
    'click #all-my-puzzles': 'scrollToPuzzles',
    'click .edit-puzzle': 'editPuzzle',
    'puzzleMakeError': 'puzzleMakeError',
    'puzzleSuccess': 'puzzleSuccess'
  },

  initialize: function (options) {
    this.games = options.games;
  },

  render: function () {
    this.$el.html(this.template());
    this.addPuzzleForm();
    this.addHomePuzzleIndex();
    this.addAllPuzzles();
    return this;
  },

  todaysPuzzle: function () {
    Backbone.history.navigate('#puzzles/5/play', {trigger: true});
  },

  addPuzzleForm: function () {
    var puzzle = new Cruci.Models.Puzzle();
    var view = new Cruci.Views.PuzzleForm({model: puzzle,
      collection: this.collection});
    this.addSubview('.puzzle-form',view);
  },

  newPuzzle: function () {
    var puzzle = new Cruci.Models.Puzzle();
    var view = new Cruci.Views.PuzzleForm({model: puzzle,
      collection: this.collection});
    this.addSubview('.new-puzzle-form',view);
    this.$('.home-buttons').addClass('hidden');
    this.$('.new-puzzle-form').removeClass('hidden');
  },

  addHomePuzzleIndex: function () {
    var view = new Cruci.Views.HomePuzzleIndex({collection: this.collection});
    this.addSubview('.puzzle-index',view);
    this.collection.fetch();
  },

  deletePuzzle: function (e) {
    var id = $(e.currentTarget).data('id');
    var puzzle = this.collection.getOrFetch(id);
    if (puzzle) { puzzle.destroy();}
  },

  editPuzzle: function (e) {
    var id = $(e.currentTarget).data('id');
    var puzzle = this.collection.getOrFetch(id);
    Backbone.history.navigate('puzzles/' + id + '/edit', { trigger: true} );
  },

  playPuzzle: function (e) {
    var id = $(e.currentTarget).data('id');
    var game = new Cruci.Models.Game({puzzle_id: id});
    game.save({},{success: function () {
        Backbone.history.navigate('/puzzles/' + id + '/play', {trigger: true});
      }
    });
  },

  addAllPuzzles: function () {
    var view = new Cruci.Views.AllPuzzles({collection: this.collection, games: this.games});
    this.addSubview('.home-all-my-puzzles',view);
  },

  scrollToPuzzles: function (e) {
    $('html, body').animate({scrollTop: $('div.home-all-my-puzzles').height()}, 1000);
  },



});
