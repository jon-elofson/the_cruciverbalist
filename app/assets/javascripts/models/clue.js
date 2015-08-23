Cruci.Models.Clue = Backbone.Model.extend({

  urlRoot: "api/clues",

  squares: function (puzzle) {
    var squares = [];
    if (this.get('direction') === "across") {
      grid = puzzle.grid();
    } else {
      grid = puzzle.transposedGrid();
    }
    var posx = this.get('start_sq_array')[0];
    var posy = this.get('start_sq_array')[1];
    var addToWord = true;
    while ( addToWord ) {
      var square;
      if ( this.get('direction') ==='across' ) {
        square = grid[posx][posy];
        posy += 1;
      } else {
        square = grid[posy][posx];
        posx += 1;
      }
      if (!square || square.get('blackedout') ) {
        addToWord = false;
      } else if ( square ) {
        squares.push(square);
      }
    }
    return squares;
  },

  answerString: function (puzzle) {
      var str = '';
      var squares = this.squares(puzzle);
      squares.forEach(function (square) {
        var val = square.get('value');
        if (val) {
          str += val;
        } else {
          str += "●";
        }
      });
    return str;
  }


});
