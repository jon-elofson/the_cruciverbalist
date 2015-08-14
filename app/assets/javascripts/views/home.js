Cruci.Views.HomeView = Backbone.CompositeView.extend({

  template: JST['home'],

  events: {
    "click .new-puzzle-button": "newPuzzle"
  },

  render: function () {
    this.$el.html(this.template());
    this.addPuzzleIndex();
    return this;
  },

  newPuzzle: function () {
    Backbone.history.navigate("puzzles/new",{trigger: true});
  },

  addPuzzleIndex: function () {
    var view = new Cruci.Views.PuzzleIndex({collection: this.collection});
    this.addSubview('.puzzle-index',view);
    this.collection.fetch();
  }


});
