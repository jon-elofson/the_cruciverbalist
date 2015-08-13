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

class Answer < ActiveRecord::Base

  validates :puzzle_id, :direction, presence: true

  validates :direction, inclusion: { in: ['down','across']}

  belongs_to :puzzle

  has_many :squares,
    class_name: "Square",
    primary_key: :id,
    foreign_key: :down_ans_id

  has_many :squares,
    class_name: "Square",
    primary_key: :id,
    foreign_key: :across_ans_id


  def determine_answer_string
    str = ""
    self.squares.each do |square|
      str += square.value
    end
    self.answer_string = str;
  end


end
