class Api::GamesController < ApplicationController

  def create
    @game = current_user.games.new(new_game_params)
    @game.save
    render :json => @game
  end

  def update
    @game = Game.find(params[:id])
    seconds = params[:game][:seconds]
    game_grid = params[:game][:game_grid]
    @game.update({seconds: seconds, game_grid: game_grid})
    render :json => @game
  end

  def index
    @games = current_user.games
    render :json => @games
  end

  private

  def new_game_params
    params.require(:game).permit(:puzzle_id,:user_id)
  end

end
