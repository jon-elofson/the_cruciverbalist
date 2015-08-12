Cruci.Views.SquareForm = Backbone.CompositeView.extend({

  template: JST['square_form'],

  tagName: "form",

  className: "square-form",

  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
  },

  render: function () {
    this.$el.html(this.template({square: this.model}));
    return this;
  },

  toggleBlack: function () {
    if (this.$el.hasClass('blacked-out')) {
      this.$el.removeClass('blacked-out');
      this.model.set('blackedout?',true);
    } else {
      this.$el.addClass('blacked-out');
      this.model.set('blackedout?',false);
    }
    this.model.save();
  },

});
