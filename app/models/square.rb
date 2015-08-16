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
#  across_ans_id  :integer
#  down_ans_id    :integer
#  down_ans_no    :integer
#  across_ans_no  :integer
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

  def no_i
    if self.across_ans_no
      return across_ans_no
    elsif self.down_ans_no
      return down_ans_no
    end
    nil
  end

  def any_no?
    self.across_ans_no || self.down_ans_no
  end


end
