class Puzzle < ActiveRecord::Base

  serialize :empty_grid, :answer_grid

  attr_reader :grid

  def initialize(row_no,col_no)
    @grid = Array.new(row_no,Array.new(col_no))
  end

  def columns
    @grid.transpose
  end



end
