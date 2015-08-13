Cruci.Models.Puzzle = Backbone.Model.extend({

  urlRoot: "api/puzzles",

  squares: function () {
    if (!this._squares) {
      this._squares= new Cruci.Collections.Squares([], { puzzle: this });
    }
    return this._squares;
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new Cruci.Collections.Answers([], {puzzle: this});
    }
    return this._answers;
  },

  parse: function (response) {
    if (response && response.squares) {
      this.squares().set(response.squares, { parse: true });
      delete response.squares;
    }
    if (response && response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }
    return response;
  }



});
