window.Cruci = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var puzzles = new Cruci.Collections.Puzzles();
    var userGames = new Cruci.Collections.Games();
    var router = new Cruci.Routers.Router({ $rootEl: $rootEl,
                 collection: puzzles, userGames: userGames});
    Backbone.history.start();
  }
};
