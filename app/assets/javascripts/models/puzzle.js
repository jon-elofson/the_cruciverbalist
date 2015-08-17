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

  clues: function () {
    if (!this._clues) {
      this._clues = new Cruci.Collections.Clues([], { puzzle: this });
    }
    return this._clues;
  },

  parse: function (response) {
    if (response && response.squares) {
      this.squares().set(response.squares, { parse: true });
      delete response.squares;
    }
    if (response && response.clues) {
      this.clues().set(response.clues, { parse: true });
      delete response.clues;
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

  updateSquares: function (pos) {
    var grid = this.grid();
    var clueCounter = 1;
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
            square.set('across_ans_no',clueCounter);
          } else {
            square.set('across_ans_no',null);
          }
          if (this.downNo(position)) {
            square.set('down_ans_no',clueCounter);
          } else {
            square.set('down_ans_no',null);
          }
          clueCounter += 1;
        } else {
          square.set('across_ans_no',null);
          square.set('down_ans_no',null);
        }
      }
    }
    this.updateClues(pos);
  },

  updateAll: function (changedSquare) {
    if (this.squares().models.length > 0) {
      this.updateSquares();
    }
    if (this.clues().length === 0 ) {
      this.addDownClues();
      this.addAcrossClues();
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

  updateClues: function (pos) {
    this.updateClueNos();
    if (pos) {
      this.addClues(pos);
    }
  },

  addClues: function (pos) {
    var grid = this.grid();
    var posArr = pos.split(",").map(function (coord) {
      return parseInt(coord);
    });
    var toggledSquare = grid[posArr[0]][posArr[1]];
    if ( toggledSquare.get('blackedout')) {
      var rightSquare = grid[posArr[0]][posArr[1]+1];
      var downSquare = grid[posArr[0]+1][posArr[1]];
      this.addClueRight(rightSquare);
      this.addClueDown(downSquare);
    } else {
      this.addClueToggled(toggledSquare,posArr);
    }
  },

  addClueDown: function (downSquare) {
    if (downSquare && downSquare.get('down_ans_no')) {
      var number = downSquare.get('down_ans_no');
      var newPosArr = [downSquare.get('posx'),downSquare.get('posy')];
      var clue = new Cruci.Models.Clue({'clue_no': number,
      'direction': 'down',
      'start_sq_array': newPosArr,
      'puzzle': this});
      this.clues().add(clue);
    }
  },

  addClueRight: function (rightSquare) {
    if (rightSquare && rightSquare.get('across_ans_no')) {
      var number = rightSquare.get('across_ans_no');
      var newPosArr = [rightSquare.get('posx'),rightSquare.get('posy')];
      var clue = new Cruci.Models.Clue({'clue_no': number,
      'direction': 'across',
      'start_sq_array': newPosArr,
      'puzzle': this});
      this.clues().add(clue);
    }
  },

  addClueToggled: function (toggledSquare,posArr) {
    var number;
    var clue;
    if (toggledSquare.get('across_ans_no')) {
      number = toggledSquare.get('across_ans_no');
      clue = new Cruci.Models.Clue({
        'clue_no': number,
        'direction': 'across',
         'start_sq_array': posArr,
         'puzzle': this});
      this.clues().add(clue);
    }
    if (toggledSquare.get('down_ans_no')) {
      number = toggledSquare.get('down_ans_no');
      clue = new Cruci.Models.Clue({
      'clue_no': number,
      'direction': 'down',
      'start_sq_array': posArr,
      'puzzle': this});
      this.clues().add(clue);
    }
  },

  updateClueNos: function () {
    var that = this;
    this.clues().forEach(function (clue) {
    if (!clue) {
      that.clues().remove(clue);
    } else {
      var startPos = clue.get('start_sq_array');
      var clueSquare = that.grid()[startPos[0]][startPos[1]];
      if (clue.get('direction') === "down" ) {
        if (!clueSquare.get('down_ans_no' || clueSquare.get('blackedout') )) {
          that.clues().remove(clue);
          clue.destroy();
        } else {
          clue.set('clue_no',clueSquare.get('down_ans_no'));
        }
      }
      if (clue.get('direction') === "across") {
        if (!clueSquare.get('across_ans_no' || clueSquare.get('blackedout'))) {
          that.clues().remove(clue);
          clue.destroy();
        } else {
          clue.set('clue_no',clueSquare.get('across_ans_no'));
        }
       }
    }
    });
  },

  addAcrossClues: function () {
    var grid = this.grid();
    for (var row = 0; row < this.row_no; row++) {
      var currentClue;
      for (var col = 0; col < this.col_no; col++) {
        var square = grid[row][col];
        if (square) {
        var number = square.get('across_ans_no');
          if (currentClue === undefined && number ) {
            var pos = [square.get('posx'),square.get('posy')];
            currentClue = new Cruci.Models.Clue({'clue_no': number,
            'direction': 'across', 'start_sq_array':  pos,
            'puzzle': this });
            this.clues().add(currentClue);
          } else if (square.get('blackedout')) {
            currentClue = undefined;
          }
        }
      }
      currentClue = undefined;
    }
  },

  addDownClues: function () {
    var grid = this.transposedGrid();
    for (var row = 0; row < this.row_no; row++) {
      var currentClue;
      for (var col = 0; col < this.col_no; col++) {
        var square = grid[row][col];
        if (square) {
        var number = square.get('down_ans_no');
        if (currentClue === undefined && number ) {
          var pos = [square.get('posx'),square.get('posy')];
          currentClue = new Cruci.Models.Clue({'clue_no': number,
          'direction': 'down', 'start_sq_array': pos, 'puzzle': this });
          this.clues().add(currentClue);
        } else if (square.get('blackedout')) {
          currentClue = undefined;
        }
      }
    }
      currentClue = undefined;
    }
  },

  privateString: function () {
    if (this.get('private')) {
      return "Private";
    } else {
      return "Public";
    }
  },

  savePuzzle: function () {
    this.squares().models.forEach(function (sq) { sq.save(); });
    this.clues().models.forEach(function (clue) { clue.save(); });
  }

});
