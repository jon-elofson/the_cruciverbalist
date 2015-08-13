# == Schema Information
#
# Table name: answers
#
#  id               :integer          not null, primary key
#  puzzle_id        :integer          not null
#  answer_string    :string
#  square_pos_array :text             not null
#  direction        :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  across_ans_no    :integer
#  down_ans_no      :integer
#

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
