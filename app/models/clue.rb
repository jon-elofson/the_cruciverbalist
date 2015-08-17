# == Schema Information
#
# Table name: clues
#
#  id             :integer          not null, primary key
#  puzzle_id      :integer          not null
#  clue_text      :text
#  direction      :string           not null
#  start_sq_array :text             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Clue < ActiveRecord::Base

  validates :puzzle_id, :direction, :clue_no, presence: true
  validates :direction, inclusion: { in: ['across','down']}

  belongs_to :puzzle

  serialize :start_sq_array


end
