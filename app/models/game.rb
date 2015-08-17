# == Schema Information
#
# Table name: games
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  puzzle_id  :integer          not null
#  game_grid  :text             not null
#  seconds    :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Game < ActiveRecord::Base

  validates :puzzle_id, :user_id, :game_grid, presence: true;

  after_initialize :determine_game_grid;

  serialize :game_grid

  belongs_to :puzzle
  belongs_to :user


  private

  def determine_game_grid
    self.game_grid = Array.new(self.puzzle.row_no) { Array.new(self.puzzle.col_no) }
  end


end
