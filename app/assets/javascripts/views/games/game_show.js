Cruci.Views.GameShow = Backbone.CompositeView.extend({

  template: JST['games/game_show'],

  render: function () {
    this.$el.html(this.template({game: this.model}));
    return this;
  },



});
