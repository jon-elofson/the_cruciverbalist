Cruci.Views.CluesIndex = Backbone.CompositeView.extend({

  template: JST['clue_index'],

  initialize: function (options) {
    this.direction = options.direction;
    this.clues = options.clues;
    this.puzzle = options.puzzle;
    this.listenTo(this.collection,'sync add remove',this.render);
  },

  render: function () {
    this.$el.html(this.template({title: this.direction}));
    this.addIndexItems();
    return this;
  },

  sortedClues: function () {
    return this.clues.sort( function (a,b) {
      return a.get('clue_no') - b.get('clue_no');
    });
  },

  addIndexItems: function () {
    var that = this;
    this.sortedClues().forEach(function (clue) {
      var view = new Cruci.Views.ClueIndexItem({model: clue,
        direction: that.direction, puzzle: that.puzzle});
      that.addSubview('.clue-list',view);
    });
  }

});
