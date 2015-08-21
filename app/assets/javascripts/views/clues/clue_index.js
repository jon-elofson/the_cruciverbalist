Cruci.Views.CluesIndex = Backbone.CompositeView.extend({

  template: JST['clues/clue_index'],

  initialize: function (options) {
    this.direction = options.direction;
    this.clues = this.collection.where({'direction': this.direction.toLowerCase()});
    this.puzzle = options.puzzle;
    this.mode = options.mode;
    this.listenTo(this.collection,'sync add remove',this.render);
  },

  render: function () {
    this.$el.html(this.template({title: this.direction}));
    this.addIndexItems();
    return this;
  },

  tagName: "div",

  className: "clue-index-div",

  sortedClues: function () {
    return this.clues.sort( function (a,b) {
      return a.get('clue_no') - b.get('clue_no');
    });
  },

  addIndexItems: function () {
    var that = this;
    this.sortedClues().forEach(function (clue) {
      var view = new Cruci.Views.ClueIndexItem({model: clue,
        direction: that.direction, puzzle: that.puzzle, mode: that.mode});
      that.addSubview('.clue-list',view);
    });
  }

});
