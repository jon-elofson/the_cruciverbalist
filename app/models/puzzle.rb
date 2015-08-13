# == Schema Information
#
# Table name: puzzles
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  title      :string           not null
#  grid       :text             not null
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


  def create_empty_grid
    @grid = Array.new(self.row_no) { Array.new(self.col_no) }
  end

  def fill_in_grid
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = Square.new(position_array: [row,col], puzzle: self)
        square.save
        self.grid[row][col] = square
      end
    end
    add_ans_nos
  end

  def recreate_grid
    squares = self.squares
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = squares.select { |sq| sq.position_array == [row,col] }
        self.grid[row][col] = square.first
      end
    end
  end

  def add_ans_nos
    answer_counter = 1
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = self.grid[row][col]
        pos = square.position_array
        if (down_no?(pos) || across_no?(pos))
          square.across_ans_no = answer_counter if across_no?(pos)
          square.down_ans_no = answer_counter if down_no?(pos)
          square.save
          answer_counter += 1
        end
      end
    end
    self.save
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

  def update_ans_no
    recreate_grid
    answer_counter = 1
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = self.grid[row][col]
        pos = square.position_array
        if (down_no?(pos) || across_no?(pos))
          prev_no = square.no_i
          square.across_ans_no = answer_counter if across_no?(pos)
          square.down_ans_no = answer_counter if down_no?(pos)
          if prev_no != square.no_i
            square.save
          end
          answer_counter += 1
        elsif square.no_i
          square.across_ans_no = nil
          square.down_ans_no = nil
          square.save
        end
      end
    end
  end


end
