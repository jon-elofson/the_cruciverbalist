Cruci.Collections.Games = Backbone.Collection.extend({

  url: "api/games",

  model: Cruci.Models.Game,

  fetchByPuzzle: function (pzId) {
    var game = this.where({'puzzle_id': pzId})[0];
    var that = this;
    if (!game) {
        return null;
    } else {
      game.fetch();
      return game;
    }
  }


});
