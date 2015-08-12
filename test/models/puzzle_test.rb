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

require 'test_helper'

class PuzzleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
