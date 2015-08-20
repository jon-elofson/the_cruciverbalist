Cruci.Views.PuzzleForm = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_form'],

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
        that.collection.add(this.model);
        that.model.fill_in_grid();
        that.$el.trigger('reRender');
      },
      error: function () {
      }
    });
    this.$el.trigger('reRender');
  }

});
