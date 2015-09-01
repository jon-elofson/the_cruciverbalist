// jshint ignore: start

Cruci.Collections.Users = Backbone.Collection.extend({

  url: 'api/users',

  getOrFetch: function (id) {
    var user = this.get(id);
    var that = this;
    if (!user) {
      user = new Cruci.Models.User({ id: id });
      this.add(user);
      user.fetch({
      error: function () {
        that.remove(user);
        }
     });
    } else {
      user.fetch();
    }
    return user;
  },





});
