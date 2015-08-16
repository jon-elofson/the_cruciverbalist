# == Schema Information
#
# Table name: squares
#
#  id             :integer          not null, primary key
#  puzzle_id      :integer          not null
#  position_array :text             not null
#  value          :string
#  blackedout     :boolean          default(FALSE), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  down_ans_no    :integer
#  across_ans_no  :integer
#

require 'test_helper'

class SquareTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
