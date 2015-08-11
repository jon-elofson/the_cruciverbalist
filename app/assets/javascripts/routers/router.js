TheCruciverbalist.Routers.Router = Backbone.Router.extend({

  routes: {
    'puzzles/new': newPuzzle,
    'puzzles/:id': showPuzzle,
    'puzzles/:id/edit': editPuzzle
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  newPuzzle: function () {

  }


});
