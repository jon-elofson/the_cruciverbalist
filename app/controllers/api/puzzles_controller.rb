class Api::PuzzlesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def new
    @puzzle = Puzzle.new
  end

  def create
    @puzzle = Puzzle.new(puzzle_params)
    @puzzle.author = current_user
    if @puzzle.save
      @puzzle.fill_in_grid
      @puzzle.check_ans_nos
      render :show
    else
      flash.now[:error] = @puzzle.errors.full_messages
      render :new
    end
  end

  def index
    current_user.puzzles
    render :json => @puzzles
  end

  def show
    @puzzle = Puzzle.find(params[:id])
    render :json => @puzzle
  end

  def edit
  end

  def update
  end

  private

  def puzzle_params
    params.require(:puzzle).permit(:title,:row_no,:col_no,:difficulty)
  end

end
