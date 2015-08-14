Cruci.Views.PuzzleForm = Backbone.CompositeView.extend({

  template: JST['puzzle_form'],

  events: {
    "click button": "submitPuzzle"
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
    this.collection.add(this.model);
    this.model.save($formData,{
      success: function () {
        that.model.fill_in_grid();
      },
      error: function () {
        that.collection.remove(that.model);
      }
    });
    this.$el.trigger('reRender');
  }

});
