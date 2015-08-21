Cruci.Collections.Games = Backbone.Collection.extend({

  url: "api/games",

  model: Cruci.Models.Game,

  comparator: function (game) {
    return -Date.parse(game.get('updated_at'));
  }

});
