Cruci.Collections.Puzzles = Backbone.Collection.extend({

  url: "api/puzzles",

  model: Cruci.Models.Puzzle,

  getOrFetch: function (id) {
    var puzzle = this.get(id);
    var that = this;
    if (!puzzle) {
      puzzle = new Cruci.Models.Puzzle({ id: id });
      this.add(puzzle);
      puzzle.fetch({
      error: function () {
        that.remove(puzzle);
        }
     });
    } else {
      puzzle.fetch();
    }
    return puzzle;
  },

  comparator: function (puzzle) {
    return Date.parse(puzzle.get('updated_at'));
  }



});
