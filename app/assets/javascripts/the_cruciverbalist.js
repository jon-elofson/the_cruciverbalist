window.Cruci = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var puzzles = new Cruci.Collections.Puzzles();
    var games = new Cruci.Collections.Games();
    var router = new Cruci.Routers.Router({ $rootEl: $rootEl,
                 collection: puzzles, games: games});
    Backbone.history.start();
  }
};
