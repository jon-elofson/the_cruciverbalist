class Api::PuzzlesController < ApplicationController

  def new
    @puzzle = Puzzle.new
  end

  def create
    @puzzle = Puzzle.new(puzzle_params)
  end

  def show
  end

  def edit
  end

  def update
  end

end
