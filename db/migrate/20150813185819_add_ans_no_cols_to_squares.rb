class AddAnsNoColsToSquares < ActiveRecord::Migration
  def change
    add_column :squares, :down_ans_no,  :integer
    add_column :squares, :across_ans_no, :integer
  end
end
