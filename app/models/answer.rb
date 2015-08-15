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

  after_initialize :determine_answer_string

  belongs_to :puzzle

  attr_accessor :squares

  has_many :down_squares,
    class_name: "Square",
    primary_key: :id,
    foreign_key: :down_ans_id

  has_many :across_squares,
    class_name: "Square",
    primary_key: :id,
    foreign_key: :across_ans_id

  def squares
    down_squares + across_squares
  end

  def determine_answer_string
    str = ""
    self.squares.sort_by { |sq| sq.id }.each do |square|
      if square.value
        str += square.value
      else
        str += "?"
      end
    end
    self.answer_string = str;
  end


end
