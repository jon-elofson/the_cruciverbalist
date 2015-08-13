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

  has_many :answers


  def create_empty_grid
    @grid = Array.new(self.row_no) { Array.new(self.col_no) }
  end

  def fill_in_grid
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = Square.new(position_array: [row,col], puzzle: self)
        square.save!
        self.grid[row][col] = square
      end
    end
    add_answer_nos
    add_across_answers
    add_down_answers
  end

  def recreate_grid
    squares = self.squares.sort_by { |sq| sq.id }
    i = 0
    while i < squares.length
      self.row_no.times do |row|
        self.col_no.times do |col|
          self.grid[row][col] = squares[i]
          i += 1
        end
      end
    end
  end

  def add_across_answers
    self.row_no.times do |row|
      self.col_no.times do |col|
        square = self.grid[row][col]
        if @current_across.nil? && square.across_ans_no
          @current_across = self.answers.create(
            across_ans_no: square.across_ans_no,
            direction: 'across')
            square.update_attributes(across_ans_id: @current_across.id)
        elsif square.blackedout
          @current_across = nil
        elsif @current_across
          square.update_attributes(across_ans_id: @current_across.id)
        end
      end
      @current_across = nil
    end
  end

  def add_down_answers
    transposed = self.grid.transpose
    self.col_no.times do |col|
      self.row_no.times do |row|
        square = transposed[col][row]
        if @current_down.nil? && square.down_ans_no
          @current_down = self.answers.create(down_ans_no: square.down_ans_no,
          direction: 'down')
          square.update_attributes(down_ans_id: @current_down.id)
        elsif square.blackedout
          @current_down = nil
        elsif @current_down
          square.update_attributes(down_ans_id: @current_down.id)
        end
      end
      @current_down = nil
    end
  end

  def add_answer_nos
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
        this_sq = self.grid[row][col]
        pos = this_sq.position_array
        if this_sq.blackedout
          remove_ans_no(this_sq)
        elsif (down_no?(pos) || across_no?(pos))
          this_sq.across_ans_no = answer_counter if across_no?(pos)
          this_sq.down_ans_no = answer_counter if down_no?(pos)
          this_sq.save
          answer_counter += 1
        elsif this_sq.any_no?
          remove_ans_no(this_sq)
        end
      end
    end
  end


  def remove_ans_no(sq)
    sq.across_ans_no = nil
    sq.down_ans_no = nil
    sq.save
  end


end
