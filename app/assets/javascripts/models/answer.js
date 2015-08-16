Cruci.Models.Answer = Backbone.Model.extend({

  squares: function () {
    if (!this._squares) {
      this._squares= new Cruci.Collections.Squares([], { answer: this });
    }
    return this._squares;
  },

  answerString: function () {
    var str = "";
    this.squares().forEach( function (sq) {
      if (sq.get('value')) {
        str += sq.get('value');
      } else {
        str += "●";
      }
    });
    return str;
  }

});
