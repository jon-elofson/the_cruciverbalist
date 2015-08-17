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
#  clue_no        :integer          not null
#

require 'test_helper'

class ClueTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
