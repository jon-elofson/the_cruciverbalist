# == Schema Information
#
# Table name: puzzles
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  title      :string           not null
#  row_no     :integer          not null
#  col_no     :integer          not null
#  private    :boolean          default(TRUE), not null
#  difficulty :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Puzzle < ActiveRecord::Base

  require_relative 'square'

  validates :author_id, :title, :row_no, :col_no, presence: true

  validates :row_no, :col_no, numericality: { greater_than: 2 }

  after_initialize :create_empty_grid

  attr_reader :grid

  belongs_to :author,
    class_name: "User",
    primary_key: :id,
    foreign_key: :author_id

  has_many :squares

  has_many :clues


  def create_empty_grid
    @grid = Array.new(self.row_no) { Array.new(self.col_no) }
  end

  def fill_in_grid
    sq_array = []
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = self.squares.new(position_array: [row,col])
        sq_array << square
        self.grid[row][col] = square
      end
    end
    add_answer_nos(sq_array)
  end

  def add_answer_nos(squares)
    i = 0
    answer_counter = 1
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = squares[i]
        pos = square.position_array
        if (down_no?(pos) || across_no?(pos))
          square.across_ans_no = answer_counter if across_no?(pos)
          square.down_ans_no = answer_counter if down_no?(pos)
          answer_counter += 1
        end
        i += 1
      end
    end
    squares.each do |sq|
      sq.save
    end
  end

  def out_of_bounds?(pos)
    row,col = pos
    if (row > self.row_no || row < 0) || (col > self.col_no || col < 0)
      return true
    end
    false
  end

  def down_no?(pos)
    prev_pos = [pos[0]-1,pos[1]]
    prev_sq = self.grid[pos[0]-1][pos[1]]
    if out_of_bounds?(prev_pos) || prev_sq.blackedout
      return true
    end
    false
  end

  def across_no?(pos)
    prev_pos = [pos[0],pos[1]-1]
    prev_sq = self.grid[pos[0]][pos[1]-1]
    if out_of_bounds?(prev_pos) || prev_sq.blackedout
      return true
    end
    false
  end


end
