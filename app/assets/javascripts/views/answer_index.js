Cruci.Views.AnswerIndex = Backbone.CompositeView.extend({

  template: JST['answer_index'],

  initialize: function (options) {
    this.direction = options.direction;
    this.answers = options.answers;
    this.listenTo(this.collection,'sync',this.render)
  },

  render: function () {
    this.$el.html(this.template({answers: this.collection,
      title: this.direction}));
    this.addIndexItems();
    return this;
  },

  addIndexItems: function () {
    var that = this;
    this.answers.forEach(function (answer) {
      var view = new Cruci.Views.AnswerIndexItem({model: answer,
        direction: that.direction});
      that.addSubview('.answer-list',view);
    });
  }

});
