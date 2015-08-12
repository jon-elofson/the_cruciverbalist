Cruci.Collections.Squares = Backbone.Collection.extend({

  url: 'api/squares',

  model: Cruci.Models.Square,

  comparator: function (square) {
    return Number(square.escape('id'));
  }


});
