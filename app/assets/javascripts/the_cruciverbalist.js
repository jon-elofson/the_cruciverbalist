// jshint ignore: start

window.Cruci = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var users = new Cruci.Collections.Users();
    var currentUser = users.getOrFetch(Cruci.CURRENT_USER_ID);
    var router = new Cruci.Routers.Router({ $rootEl: $rootEl,
                 users: users, currentUser: currentUser});
    Backbone.history.start();
  }
};
