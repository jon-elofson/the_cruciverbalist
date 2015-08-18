Cruci.Views.GameShow = Backbone.CompositeView.extend({

  template: JST['games/game_show'],

  initialize: function (options) {
    this.listenTo(this.model,'sync',this.render);
    this.gameOn = true;
    this.puzzle = options.puzzle;
    this.interval = window.setInterval(this.run.bind(this),1000);
    this.seconds = this.model.get('seconds');
  },

  render: function () {
    this.$el.html(this.template({seconds: this.timeStr()}));
    return this;
  },

  timeStr: function () {
    var seconds = this.seconds;
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    result = [hours,minutes,seconds].map(function (time) {
      timeStr = time.toString();
      if (timeStr.length === 1) {
        timeStr = "0" + timeStr;
      }
      return timeStr;
    });
    return result.join(":");
  },

  run: function () {
    if (this.model.gameOver(this.puzzle) === false ) {
      if (this.seconds % 10 === 0) {
        this.model.storeGameValues(this.puzzle,this.seconds,true);
      } else {
        this.model.storeGameValues(this.puzzle,this.seconds,false);
      }
      this.seconds += 1;
      this.render();
    } else {
      this.$("h2").removeClass('hidden');
      window.clearInterval(this.interval);
    }
  }



});
