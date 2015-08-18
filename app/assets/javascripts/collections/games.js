Cruci.Collections.Games = Backbone.Collection.extend({

  url: "api/games",

  model: Cruci.Models.Game,

  fetchByPuzzle: function (pzId) {
    var puzzleId = parseInt(pzId);
    var game = this.where({'puzzle_id': puzzleId});
    var that = this;
    if (!game) {
        game = new Cruci.Models.Game({'puzzle_id': puzzleId});
        this.add(game);
        game.fetch({
          error: function () {
            that.remove(game);
          }
        });
    } else {
      game.fetch();
    }
    return game;
  }


});
