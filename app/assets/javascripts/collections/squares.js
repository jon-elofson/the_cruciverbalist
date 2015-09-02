Cruci.Collections.Squares = Backbone.Collection.extend({

  url: 'api/squares',

  model: Cruci.Models.Square,

  comparator: function (square) {
    var xStr = Number(square.escape('posx')).toString();
    var yStr = Number(square.escape('posy')).toString();
    if ( yStr.length !== 2) {
      yStr = "0" + yStr;
    }
    var combined = xStr + yStr;
    return Number(combined);
  }


});
