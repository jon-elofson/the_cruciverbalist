Cruci.Views.ClueIndexItem = Backbone.CompositeView.extend({

  template: JST['clue_index_item'],

  tagName: 'li',

  event: {
   'blur input.clue-text': 'updateClueText',
 },


  className: 'clue-index-item',

  initialize: function (options) {
    this.direction = options.direction;
    this.puzzle = options.puzzle;
    this.listenTo(this.model,"sync add remove",this.render);
  },

  findAnswerString: function () {
    return this.model.answerString(this.puzzle);
  },


  render: function () {
    var that = this;
    var clue_no = this.model.get('clue_no');
    if (clue_no) {
    this.$el.html(this.template({clue: this.model, clue_no: clue_no,
      answer_str: this.findAnswerString()}));
    }
    return this;
  },

  updateClueText: function () {
    var valData = this.$("input").serializeJSON();
    debugger;
    var new_val = valData.square.value.toUpperCase();
    this.model.set('value',new_val);
    this.render();
    this.$el.trigger('updateClues');
  },



});
