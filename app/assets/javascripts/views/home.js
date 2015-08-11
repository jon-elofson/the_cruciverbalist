Cruci.Views.HomeView = Backbone.CompositeView.extend({

  template: JST['home'],

  render: function () {
    this.$el.html(this.template());
    return this;
  }


});
