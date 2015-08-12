Cruci.Views.HomeView = Backbone.CompositeView.extend({

  template: JST['home'],

  events: {
    "click .new-puzzle-button": "newPuzzle"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  newPuzzle: function () {
    Backbone.history.navigate("puzzles/new",{trigger: true});
  }


});
