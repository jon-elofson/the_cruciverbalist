Cruci.Views.AnswerIndexItem = Backbone.CompositeView.extend({

  template: JST['answer_index_item'],

  tagName: 'li',

  className: 'answer-index-item',

  initialize: function (options) {
    this.direction = options.direction;
    this.listenTo(this.model,"sync",this.render);
  },

  answerNo: function () {
    if (this.direction === 'Across') {
      return this.model.get('across_ans_no');
    } else {
      return this.model.get('down_ans_no');
    }
  },

  render: function () {
    var that = this;
    this.$el.html(this.template({answer_no: that.answerNo(),
      answer_str: that.model.answerString()}));
    return this;
  }

});
