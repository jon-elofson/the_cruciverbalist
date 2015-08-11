window.Cruci = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var router = new Cruci.Routers.Router({$rootEl: $rootEl});
    Backbone.history.start();
  }
};
