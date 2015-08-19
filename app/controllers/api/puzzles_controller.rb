class Api::PuzzlesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :ensure_logged_in

  def new
    @puzzle = Puzzle.new
  end

  def update
    @puzzle = Puzzle.find(params[:id]);
    render :json => @puzzle
  end

  def create
    @puzzle = Puzzle.new(puzzle_params)
    @puzzle.author = current_user
    if @puzzle.save
      render :show
    else
      flash.now[:error] = @puzzle.errors.full_messages
    end
  end

  def index
    @puzzles = current_user.puzzles
    render :json => @puzzles
  end

  def show
    @puzzle = Puzzle.includes(:squares).includes(:clues).includes(:games).find(params[:id])
  end

  def fill_in_grid
    @puzzle = Puzzle.find(params[:id])
    @puzzle.fill_in_grid
    render :json => @puzzle
  end

  def destroy
    @puzzle = Puzzle.find(params[:id])
    @puzzle.destroy
    index
  end

  private

  def puzzle_params
    params.require(:puzzle).permit(:title,:row_no,:col_no,:difficulty)
  end

end
