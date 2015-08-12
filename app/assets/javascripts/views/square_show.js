Cruci.Views.SquareShow = Backbone.CompositeView.extend({

  template: JST['square_show'],

  tagName: "div",

  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
  },

  render: function () {
    this.$el.html(this.template({square: this.model}));
    return this;
  },

});
