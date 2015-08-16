Cruci.Models.Square = Backbone.Model.extend({

  urlRoot: 'api/squares',

  changed: function () {
    if (!this._changed) {
      return false;
    } else {
      return true;
    }
  }
});
