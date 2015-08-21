Cruci.Views.ClueIndexItem = Backbone.CompositeView.extend({

  template: JST['clues/clue_index_item'],

  tagName: 'li',

  events: {
   'blur .clue-text': 'updateClueText',
   },

   initialize: function (options) {
     this.direction = options.direction;
     this.puzzle = options.puzzle;
     this.mode = options.mode;
     this.listenTo(this.model,"sync",this.render);
   },

  className: function () {
    if ( this.mode === "edit") {
      return "clue-index-item";
    } else if (this.mode === "play") {
      return "clue-index-item play-mode";
    }
  },

  findAnswerString: function () {
    return this.model.answerString(this.puzzle);
  },


  render: function () {
    var that = this;
    var clue_no = this.model.get('clue_no');
    if (clue_no) {
    this.$el.html(this.template({clue: that.model, clue_no: clue_no,
      answer_str: that.findAnswerString(), mode: that.mode}));
    }
    return this;
  },

  updateClueText: function () {
    var valData = this.$(".clue-text").serializeJSON();
    var new_val = valData.clue.value;
    this.model.set('clue_text',new_val);
  },



});
