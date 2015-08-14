window.Cruci = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var puzzles = new Cruci.Collections.Puzzles();
    var router = new Cruci.Routers.Router({ $rootEl: $rootEl,
                 collection: puzzles});
    Backbone.history.start();
  }
};
