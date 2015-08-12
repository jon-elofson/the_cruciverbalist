Cruci.Models.Puzzle = Backbone.Model.extend({

  urlRoot: "api/puzzles",

  squares: function () {
    if (!this._squares) {
      this._squares= new Cruci.Collections.Squares([], { puzzle: this });
    }
    return this._squares;
  },

  parse: function (response) {
    if (response.squares) {
      this.squares().set(response.squares, { parse: true });
      delete response.squares;
    }
    return response;
  }


});
