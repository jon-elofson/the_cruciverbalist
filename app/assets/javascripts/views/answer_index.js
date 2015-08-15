Cruci.Views.AnswerIndex = Backbone.CompositeView.extend({

  template: JST['answer_index'],

  initialize: function (options) {
    this.direction = options.direction;
    this.answers = options.answers;
    this.listenTo(this.collection,'sync add remove',this.render);
  },

  render: function () {
    this.$el.html(this.template({title: this.direction}));
    this.addIndexItems();
    return this;
  },

  sortedAnswers: function () {
    if ( this.direction === 'Across') {
      return this.answers.sort( function (a,b) {
        return a.get('across_ans_no') - b.get('across_ans_no');
      });
    } else {
      return this.answers.sort( function (a,b) {
        return a.get('down_ans_no') - b.get('down_ans_no');
      });
    }
  },

  addIndexItems: function () {
    var that = this;
    this.sortedAnswers().forEach(function (answer) {
      var view = new Cruci.Views.AnswerIndexItem({model: answer,
        direction: that.direction});
      that.addSubview('.answer-list',view);
    });
  }

});
