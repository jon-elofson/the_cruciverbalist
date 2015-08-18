Cruci.Models.Game = Backbone.Model.extend({

  urlRoot: "api/games",

  storeGameValues: function (puzzle, seconds, save) {
    var squares = puzzle.squares().models;
    var grid = this.get('game_grid');
    var i = 0;
    for (var rowNo = 0; rowNo < grid.length; rowNo++) {
      row = grid[rowNo];
      for (var colNo = 0; colNo < rowNo; colNo++) {
        grid[rowNo][colNo] = squares[i].get('gameValue');
        i += 1;
      }
    }
    this.set('game_grid', grid);
    this.set('seconds',seconds);
    if (save) {
      this.save();
    }
  },


  gameOver: function (puzzle) {
    var squares = puzzle.squares().models;
    for (var i = 0; i < squares.length; i++) {
      var sq = squares[i];
      if (sq.get('gameValue') !== sq.get('value') &&
      (sq.get('blackedout') === false)) {
        return false;
      }
    }
    return true;
  }

});
