Cruci.Views.AnswerIndexItem = Backbone.CompositeView.extend({

  template: JST['answer_index_item'],

  tagName: 'li',

  className: 'answer-index-item',

  initialize: function (options) {
    this.direction = options.direction;
  },

  answer_no: function () {
    if (this.direction === 'Across') {
      return this.model.get('across_ans_no');
    } else {
      return this.model.get('down_ans_no');
    }
  },

  render: function () {
    this.$el.html(this.template({answer_no: this.answer_no()}));
    return this;
  }

});
