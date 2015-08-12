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

class Square < ActiveRecord::Base

  serialize :position_array

  validates :puzzle_id, :position_array, presence: true

  belongs_to :puzzle

  def no_str
    if self.across_ans_no
      return across_ans_no.to_s
    elsif self.down_ans_no
      return down_ans_no.to_s
    end
  end


end
