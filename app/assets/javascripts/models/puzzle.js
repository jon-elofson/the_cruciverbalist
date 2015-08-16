Cruci.Models.Puzzle = Backbone.Model.extend({

  urlRoot: "api/puzzles",

  grid: function () {
    var sqIdx = 0;
    var squares = this.squares().models;
    this.row_no = this.get('row_no');
    this.col_no = this.get('col_no');
    var _grid = new Array(this.row_no);
    for (var i = 0; i < this.row_no; i++) {
      _grid[i] = new Array(this.col_no);
      for (var j = 0; j < this.col_no; j++) {
        _grid[i][j] = squares[sqIdx];
        sqIdx += 1;
      }
    }
    return _grid;
  },


  transposedGrid: function () {
    var grid = this.grid();
    var _transGrid = new Array(this.col_no);
    for (var i = 0; i < this.row_no; i++) {
      _transGrid[i] = new Array(this.col_no);
      for (var j = 0; j < this.col_no; j++) {
        _transGrid[i][j] = grid[j][i];
      }
    }
    return _transGrid;
  },

  squares: function () {
    if (!this._squares) {
      this._squares= new Cruci.Collections.Squares([], { puzzle: this });
    }
    return this._squares;
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new Cruci.Collections.Answers([], {puzzle: this});
    }
    return this._answers;
  },

  parse: function (response) {
    if (response && response.squares) {
      this.squares().set(response.squares, { parse: true });
      delete response.squares;
    }
    if (response && response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }
    return response;
  },

  fill_in_grid: function(opts) {
     var model = this,
     url = model.url() + '/fill_in_grid',
     options = {
     url: url,
     type: 'GET'
    };
    return (this.sync || Backbone.sync).call(this, null, this, options);
  },

  updateSquares: function () {
    var grid = this.grid();
    var answerCounter = 1;
    for (var i = 0; i < this.row_no; i++) {
      for (var j = 0; j < this.col_no; j++) {
        var square = grid[i][j];
        var position = [square.get('posx'),square.get('posy')];
        var blackedOut = square.get('blackedout');
        if ( blackedOut ) {
          square.set('value',null);
          square.set('across_ans_no',null);
          square.set('down_ans_no',null);
        } else if ( this.acrossNo(position) || this.downNo(position) ) {
          if (this.acrossNo(position)) {
            square.set('across_ans_no',answerCounter);
          } else {
            square.set('across_ans_no',null);
          }
          if (this.downNo(position)) {
            square.set('down_ans_no',answerCounter);
          } else {
            square.set('down_ans_no',null);
          }
          answerCounter += 1;
        } else {
          square.set('across_ans_no',null);
          square.set('down_ans_no',null);
        }
      }
    }
  },

  updateAll: function () {
    if (this.squares().models.length > 0) {
      this.updateSquares();
      this.updateAnswers();
    }
  },

  acrossNo: function (pos) {
    var prev_pos = [pos[0],pos[1]-1];
    if (this.outOfBounds(prev_pos)) { return true; }
    var prev_sq = this.grid()[pos[0]][pos[1]-1];
    if (prev_sq.get('blackedout')) { return true; }
    return false;
  },

  downNo: function (pos) {
    var prev_pos = [pos[0]-1,pos[1]];
    if (this.outOfBounds(prev_pos)) { return true; }
    var prev_sq = this.grid()[pos[0]-1][pos[1]];
    if (prev_sq.get('blackedout')) { return true; }
    return false;
  },

  outOfBounds: function (pos) {
    var row = pos[0];
    var col = pos[1];
    if ((row > this.row_no || row < 0) || (col > this.col_no || col < 0)) {
      return true;
    }
    return false;
  },

  percentComplete: function () {
    var completedCount = 0;
    var squares = this.squares().models;
    if (squares.length === 0) {return 0;}
    squares.forEach(function (sq) {
      if (sq.get('value')) {
        completedCount += 1;
      }
    });
    return Math.round((completedCount / squares.length) * 100);
  },

  updateAnswers: function () {
    this.answers().reset();
    this.addAcrossAnswers();
    this.addDownAnswers();
  },

  addAcrossAnswers: function () {
    var grid = this.grid();
    for (var row = 0; row < this.row_no; row++) {
      var answerSquares;
      var currentAnswer;
      for (var col = 0; col < this.col_no; col++) {
        var square = grid[row][col];
        var number = square.get('across_ans_no');
        if (currentAnswer === undefined && number ) {
          currentAnswer = new Cruci.Models.Answer({'across_ans_no': number,
          'direction': 'across' });
          currentAnswer.squares().add(square);
          this.answers().add(currentAnswer);
        } else if (square.get('blackedout')) {
          answerSquares = undefined;
          currentAnswer = undefined;
        } else if (currentAnswer) {
          currentAnswer.squares().add(square);
        }
      }
      currentAnswer = undefined;
    }
  },

  addDownAnswers: function () {
    var grid = this.transposedGrid();
    for (var row = 0; row < this.row_no; row++) {
      var answerSquares;
      var currentAnswer;
      for (var col = 0; col < this.col_no; col++) {
        var square = grid[row][col];
        var number = square.get('down_ans_no');
        if (currentAnswer === undefined && number ) {
          currentAnswer = new Cruci.Models.Answer({'down_ans_no': number,
          'direction': 'down' });
          currentAnswer.squares().add(square);
          this.answers().add(currentAnswer);
        } else if (square.get('blackedout')) {
          currentAnswer = undefined;
        } else if (currentAnswer) {
          currentAnswer.squares().add(square);
        }
      }
      currentAnswer = undefined;
    }
  },

  privateString: function () {
    if (this.get('private')) {
      return "Private";
    } else {
      return "Public";
    }
  },

  savePuzzleSquares: function () {
    this.squares().models.forEach(function (sq) { sq.save(); });
  }

});
