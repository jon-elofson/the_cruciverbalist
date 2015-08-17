Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    "click .save-puzzle": "savePuzzle",
    'toggledBlack': 'updatePuzzle',
    'updateClues': 'updateClues'
  },

  className: "container puzzle-content",

  handleNavigate: function (pos,keyCode) {
    var width = this.model.get('col_no');
    if (pos) {
      var newPos = (pos[0] * width) + pos[1];
      var $newSquare = this.$el.find('.grid-square').eq(newPos);
      if ($newSquare) {
        this.$('.selected-square').removeClass('selected-square');
        $newSquare.addClass("selected-square");
        if (keyCode !== this.keys['tab']) {
          $newSquare.find("input").focus();
        }
      }
    }
  },

  savePuzzle: function () {
    this.model.savePuzzle();
  },

  updateClues: function () {
    this.removeSubview(".down-clues",this.downView);
    this.removeSubview(".across-clues",this.acrossView);
    this.addAcrossClues();
    this.addDownClues();
  },

  updatePuzzle: function (e) {
    var $changedSquare = $('.toggled');
    var pos = $changedSquare.data('pos');
    $changedSquare.removeClass('toggled');
    this.model.updateAll();
    this.model.updateClues(pos);
    this.updateClues();
    this.render();
  },


  keys: {
    "down": 40,
    "up": 38,
    "left": 37,
    "right": 39,
    "space": 32,
    "tab": 9,
  },

  keyHandler: function (e) {
    var pos = this.$('.selected-square').data('pos');
    if (!pos) { return; }
    pos = pos.split(",").map(function (el) {
      return parseInt(el);
    });
    var keys = this.keys;
    var newPos;
    if (e.keyCode === keys["down"]) {
      newPos = [pos[0]+1,pos[1]];
    } else if (e.keyCode === keys["up"]) {
      newPos = [pos[0]-1,pos[1]];
    } else if (e.keyCode === keys["left"]) {
      newPos = [pos[0],pos[1]-1];
    } else if (e.keyCode === keys["right"] || e.keyCode === keys["tab"]) {
      newPos = [pos[0],pos[1]+1];
    }
    this.handleNavigate(newPos,e.keyCode);
  },


  initialize: function (options) {
    this.listenTo(this.model,"sync",this.render);
    this.squares = this.model.squares();
    $("body").on("keydown",this.keyHandler.bind(this));
    this.saveInt = window.setInterval(this.savePuzzle.bind(this), 600000);
  },

  addSquares: function () {
    var that = this;
    var height = this.model.get('row_no') * 40;
    var width = this.model.get('col_no') * 40;
    this.$(".puzzle-grid").width(width);
    this.$(".puzzle-grid").height(height);
    this.squares.each(function (square) {
      var view = new Cruci.Views.SquareShow({model: square});
      that.addSubview(".puzzle-grid",view);
    });
    return this;
  },

  addAcrossClues: function () {
    var acrossClues = this.model.clues().where({direction: 'across'});
    this.acrossView = new Cruci.Views.CluesIndex({clues: acrossClues,
      direction: 'Across',puzzle: this.model});
    this.addSubview(".across-clues",this.acrossView);
  },

  addDownClues: function () {
    var downClues = this.model.clues().where({direction: 'down'});
    this.downView = new Cruci.Views.CluesIndex({clues: downClues,
      direction: 'Down',puzzle: this.model});
    this.addSubview(".down-clues",this.downView);
  },

  render: function () {
    this.model.updateAll();
    this.$el.html(this.template({puzzle: this.model}));
    this.addSquares();
    this.addAcrossClues();
    this.addDownClues();
    return this;
  },

  selectSquare: function (e) {
    if ($(this.$(".selected-square"))) {
      this.$(".square-form").remove();
      this.$(".selected-square").removeClass("selected-square");
    }
    $(e.currentTarget).addClass("selected-square");
  },


});
