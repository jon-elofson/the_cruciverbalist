window.TheCruciverbalist = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var router = new TheCruciverbalist.Routers.Router({$rootEl: $rootEl});
    Backbone.history.start();
  }
};
