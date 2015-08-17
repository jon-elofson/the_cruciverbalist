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



  belongs_to :puzzle
  belongs_to :user



end
