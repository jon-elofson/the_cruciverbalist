Cruci.Views.PuzzleShow = Backbone.CompositeView.extend({

  template: JST['puzzles/puzzle_show'],

  tagName: "div",

  events: {
    "click .grid-square": "selectSquare",
    "click .save-puzzle": "savePuzzle",
    "click .save-game": "saveGame",
    "click .reveal-puzzle": "revealPuzzle",
    "click .play-puzzle": "playPuzzle",
    "click .check-symmetry": "checkSymmetry",
    "click .check-word-length": "checkWordLength",
    "click .edit-title": "editTitle",
    'toggledBlack': 'updatePuzzle',
    'updateClues': 'updateClueLists',
    "click .home-button": 'endGame'
  },

  className: "container puzzle-content",

  initialize: function (options) {
    this.squares = this.model.squares();
    this.mode = options.mode;
    this.userId = options.userId;
    this.games = options.games;
    if (this.mode === 'play') {
      this.squares.forEach( function (sq) {
        sq.set('error',false);
      });
      this.updateSquareGameVals();
      this.listenTo(this.games,"sync", this.updateSquareGameVals);
    }
    this.listenTo(this.model,"sync change:title", this.render);
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

  editTitle: function () {
    this.savePuzzle();
    var that = this;
    bootbox.prompt("What would you like to rename your puzzle?", function(result) {
      if (result) {
        that.model.set('title',result);
        that.model.save();
      }
    });
  },

  savePuzzle: function () {
    if ( this.mode === 'play' ) { return; }
    this.model.squares().models.forEach(function (sq) { sq.save(); });
    this.model.clues().models.forEach(function (clue) { clue.save(); });
    this.render();
  },


  endGame: function () {
    this.saveGame();
    this.gameView.endGame();
    Backbone.history.navigate('#',{trigger: true});
  },

  saveGame: function () {
    if ( this.game ) {
      this.game.save();
    }
  },

  checkWordLength: function () {
    this.squares.forEach( function (sq) {
      sq.set('error',false);
    });
    var shortWordSqs = this.model.checkWordLength();
    if ( shortWordSqs.length === 0 ) {
      bootbox.alert("All of your words are greater than two letters long!", function() {
    });
    } else {
      shortWordSqs.forEach( function (sq) {
        sq.set('error',true);
    });
      bootbox.alert("Your puzzle has words with less than three letters!", function() {
    });
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
    var that = this;
    bootbox.confirm("Are you sure you want to reveal the puzzle?", function(result) {
      if (result === true ) {
        that.gameView.endGame();
        that.squares.forEach( function (sq) {
          sq.set('show',true);
        });
      }
    });
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

  checkSymmetry: function () {
    this.squares.forEach( function (sq) {
      sq.set('error',false);
    });
    var asymmetricSqs = this.model.checkSymmetry();
    if ( asymmetricSqs.length === 0 ) {
    bootbox.alert("Your puzzle is symmetrical! ✓", function() {
    });
    } else {
      asymmetricSqs.forEach( function (sq) {
        sq.set('error',true);
    });
    bootbox.alert("Your puzzle is asymmetrical!", function() {
    });
    }
  },

  addSquares: function () {
    this.updateSquareGameVals();
    var height = (33 / this.model.get('row_no')).toString() + "vw";
    var width = (33 / this.model.get('col_no')).toString() + "vw";
    var that = this;
    this.squares.forEach(function (square) {
      var view = new Cruci.Views.SquareShow({model: square, mode: that.mode,
      puzzleSize: that.model.get('row_no')});
      view.$el.width(width);
      view.$el.height(height);
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
