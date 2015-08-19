Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    "click .save-puzzle": "savePuzzle",
    "click .save-game": "saveGame",
    "click .play-puzzle": "playPuzzle",
    'toggledBlack': 'updatePuzzle',
    'updateClues': 'updateClueLists'
  },

  className: "container puzzle-content",

  initialize: function (options) {
    this.squares = this.model.squares();
    this.mode = options.mode;
    this.games = options.games;
    this.listenTo(this.games,"sync", this.updateSquareGameVals);
    this.listenTo(this.model,"sync",this.render);
    $("body").on("keydown",this.keyHandler.bind(this));
  },

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
    if ( this.mode === 'play' ) { return; }
    this.model.savePuzzle();
  },

  saveGame: function () {
    if ( this.game ) {
      this.game.save();
    }
  },

  updateSquareGameVals: function () {
    if (!this.games) {return;}
    this.game = this.games.models[0];
    if (this.game && !this.gameView) {
      this.addGameView();
      var gameGrid = this.game.get('game_grid');
      this.squares.each(function (square) {
      var gameValue = gameGrid[square.get('posx')][square.get('posy')];
      if (gameValue) {
        square.set('gameValue',gameValue);
      }
      });
    }
  },

  playPuzzle: function () {
    Backbone.history.navigate('/puzzles/' + this.model.id + "/play",{ trigger: true });
  },

  updateClueLists: function () {
    if ( this.mode === 'play' ) { return; }
    this.removeSubview(".down-clues",this.downView);
    this.removeSubview(".across-clues",this.acrossView);
    this.addAcrossClues();
    this.addDownClues();
  },

  updatePuzzle: function (e) {
    if ( this.mode === 'play' ) { return; }
    var $changedSquare = $('.toggled');
    var pos = $changedSquare.data('pos');
    this.model.updateSquares(pos);
    $changedSquare.removeClass('toggled');
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


  addGameView: function () {
    if (!this.gameView) {
      this.gameView = new Cruci.Views.GameShow({model: this.game, puzzle: this.model});
      this.addSubview(".puzzle-info div.game-show",this.gameView);
    }
  },

  addSquares: function () {
    this.updateSquareGameVals();
    var height;
    var width;
    if (this.mode === 'edit') {
      height = (this.model.get('row_no') * 40 + 50);
      width = (this.model.get('col_no') * 40 + 50);
    } else {
      height = (this.model.get('row_no') * 40 + 50);
      width = (this.model.get('col_no') * 40) + 50;
    }
    this.$(".puzzle-grid").width(width);
    this.$(".puzzle-grid").height(height);
    this.$(".puzzle-grid").css({'max-width': width, 'max-height': height,
    'min-height': height,'min-width': width});
    var that = this;
    this.squares.forEach(function (square) {
      var view = new Cruci.Views.SquareShow({model: square, mode: that.mode});
      that.addSubview(".puzzle-grid",view);
    });
    return this;
  },

  addAcrossClues: function () {
    var acrossClues = this.model.clues();
    this.acrossView = new Cruci.Views.CluesIndex({collection: acrossClues,
      direction: 'Across',puzzle: this.model,mode: this.mode});
    this.addSubview(".across-clues",this.acrossView);
  },

  addDownClues: function () {
    var downClues = this.model.clues();
    this.downView = new Cruci.Views.CluesIndex({collection: downClues,
      direction: 'Down',puzzle: this.model, mode: this.mode});
    this.addSubview(".down-clues",this.downView);
  },

  render: function () {
    this.model.updateAll();
    this.$el.html(this.template({puzzle: this.model, mode: this.mode}));
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
