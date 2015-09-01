// jshint ignore: start

Cruci.Models.User = Backbone.Model.extend({

  urlRoot: "api/users",

  puzzles: function () {
    if (!this._puzzles) {
      this._puzzles = new Cruci.Collections.Puzzles([], { author: this });
    }
    return this._puzzles;
  },

  games: function () {
    if (!this._games) {
      this._games = new Cruci.Collections.Games([], { user: this });
    }
    return this._games;
  },

  parse: function (response) {
    if (response && response.puzzles) {
      this.puzzles().set(response.puzzles, { parse: true });
      delete response.puzzles;
    }
    if (response && response.games) {
      this.games().set(response.games, { parse: true });
      delete response.games;
    }
  },

});
