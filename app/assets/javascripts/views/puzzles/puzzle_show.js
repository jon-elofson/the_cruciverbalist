Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    "click .save-puzzle": "savePuzzle",
    "click .save-game": "saveGame",
    "click .reveal-puzzle": "reavealPuzzle",
    "click .play-puzzle": "playPuzzle",
    'toggledBlack': 'updatePuzzle',
    'updateClues': 'updateClueLists'
  },

  className: "container puzzle-content",

  initialize: function (options) {
    this.squares = this.model.squares();
    this.mode = options.mode;
    this.userId = options.userId;
    this.games = options.games;
    if (this.mode === 'game') {
      this.updateSquareGameVals();
      this.listenTo(this.games,"sync", this.updateSquareGameVals);
    }
    this.listenTo(this.model,"sync", this.render);
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
    if (!this.games) { return; }
    this.game = this.games.findWhere({user_id: this.userId});
      if (this.game) {
      var gameGrid = this.game.get('game_grid');
      this.squares.each(function (square) {
      var gameValue = gameGrid[square.get('posx')][square.get('posy')];
      if (gameValue) {
        square.set('gameValue',gameValue);
      }
      });
    }
    this.addGameView();
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
    $changedSquare.removeClass('toggled');
    var pos = $changedSquare.data('pos');
    this.model.updateSquares(pos);
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

  revealPuzzle: function () {
    alert('Are you sure you want to reveal the puzzle?');
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

    if ( this.gameView || !this.game ) { return; }

    this.gameView = new Cruci.Views.GameShow({model: this.game, puzzle: this.model});
    this.addSubview("div.game-show",this.gameView);
  },

  addSquares: function () {
    this.updateSquareGameVals();
    var height = (this.model.get('row_no') * 40) + 30;
    var width = (this.model.get('col_no') * 40) + 30;
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
    this.acrossClues = this.model.clues();
    this.acrossView = new Cruci.Views.CluesIndex({collection: this.acrossClues,
      direction: 'Across',puzzle: this.model,mode: this.mode});
    this.addSubview(".across-clues",this.acrossView);
  },

  addDownClues: function () {
    this.downClues = this.model.clues();
    this.downView = new Cruci.Views.CluesIndex({collection: this.downClues,
      direction: 'Down',puzzle: this.model, mode: this.mode});
    this.addSubview(".down-clues",this.downView);
  },

  render: function () {
    this.model.updateAll();
    this.$el.html(this.template({puzzle: this.model, mode: this.mode}));
    this.setupViews();
    if (this.gameView) {
      this.attachSubview("div.game-show",this.gameView);
    }
    return this;
  },

  setupViews: function () {
    this.addSquares();
    this.addDownClues();
    this.addAcrossClues();
  },

  selectSquare: function (e) {
    if ($(this.$(".selected-square"))) {
      this.$(".square-form").remove();
      this.$(".selected-square").removeClass("selected-square");
    }
    $(e.currentTarget).addClass("selected-square");
  },


});
