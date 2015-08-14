Cruci.Views.HomeView = Backbone.CompositeView.extend({

  template: JST['home'],

  events: {
    "click .new-puzzle-button": "newPuzzle",
    "reRender": "render",
    'click .delete-puzzle': 'deletePuzzle',
    'click .edit-puzzle': 'editPuzzle'
  },

  render: function () {
    this.$el.html(this.template());
    this.addPuzzleIndex();
    return this;
  },

  newPuzzle: function () {
    var puzzle = new Cruci.Models.Puzzle();
    var view = new Cruci.Views.PuzzleForm({model: puzzle,
      collection: this.collection});
    this.addSubview('.new-puzzle-form',view);
    this.$('.home-buttons').addClass('hidden');
    this.$('.new-puzzle-form').removeClass('hidden');
  },

  addPuzzleIndex: function () {
    var view = new Cruci.Views.PuzzleIndex({collection: this.collection});
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
    Backbone.history.navigate('puzzles/' + id, { trigger: true} );
  }


});
