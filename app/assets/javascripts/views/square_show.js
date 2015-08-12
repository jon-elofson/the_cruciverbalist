Cruci.Views.SquareShow = Backbone.CompositeView.extend({

  template: JST['square_show'],

  events: {
    'click': 'toggleSelected'
  },

  tagName: "div",

  className: "grid-square",

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

  toggleSelected: function () {
    var view = new Cruci.Views.SquareForm({ model: this.model });
    this.addSubview(".form-div",view);
  }

});
