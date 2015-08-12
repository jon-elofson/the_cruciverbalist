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
    this.model.save($formData,{
      success: function () {
        var id = that.model.get('id');
        that.collection.add(that.model);
        Backbone.history.navigate('puzzles/' + id,{trigger: true});
      }
    });
  }

});
