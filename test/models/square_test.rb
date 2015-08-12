# == Schema Information
#
# Table name: squares
#
#  id             :integer          not null, primary key
#  puzzle_id      :integer          not null
#  position_array :text             not null
#  value          :string           not null
#  blackedout     :boolean          default(FALSE), not null
#  down_ans_no    :integer
#  across_ans_no  :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class SquareTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
