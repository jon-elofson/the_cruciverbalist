class Api::SquaresController < ApplicationController

  skip_before_action :verify_authenticity_token

  def show
    @square = Square.find(params[:id])
    render :json => @square
  end

  def index
    @squares = Square.all
    render :json => @squares
  end

  def edit
  end

  def update
    @square = Square.find(params[:id]);
    @square.update_attributes(square_params)
    @square.puzzle.update_ans_no
    render :json => @square
  end

  private

  def square_params
    params.require(:square).permit(:value,:blackedout)
  end

  def current_puzzle
    if params[:id]
      @square = Square.find(params[:id])
      @board = @square.board
    elsif params[:square]
      @puzzle = Board.find(params[:square][:puzzle_id])
    end
  end

end
