Cruci.Views.PuzzleForm = Backbone.CompositeView.extend({

  template: JST['puzzle_form'],

  events: {
    "click button": "submitPuzzle",
  },

  render: function () {
    this.$el.html(this.template({puzzle: this.model}));
    return this;
  },

  submitPuzzle: function (e) {
    e.preventDefault();
    $formData = this.$("form").serializeJSON();
    var that = this;
    this.model.set($formData);
    this.model.save($formData,{
      success: function () {
        that.model.fill_in_grid();
        that.collection.add(this.model);
      },
      error: function () {
      }
    });
    this.$el.trigger('reRender');
  }

});
