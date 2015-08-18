Cruci.Collections.Games = Backbone.Collection.extend({

  url: "api/games",

  model: Cruci.Models.Game,

  fetchByPuzzle: function (pzId,usId) {
    var puzzleId = parseInt(pzId);
    var game = this.where({'puzzle_id': puzzleId}, true);
    var that = this;
    if (!game) {
        game = new Cruci.Models.Game({'puzzle_id': puzzleId, 'user_id': usId});
        this.add(game);
        game.fetch({
          success: function () {
            return game;
          },
          error: function () {
            this.remove(game);
            return null;
          }
        });
    } else {
      game.fetch();
      return game;
    }
  }


});
