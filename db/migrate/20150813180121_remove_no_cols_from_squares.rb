class RemoveNoColsFromSquares < ActiveRecord::Migration
  def change
    remove_column :squares, :down_ans_no
    remove_column :squares, :across_ans_no
    add_column :squares, :across_ans_id, :integer
    add_column :squares, :down_ans_id, :integer
    add_index :squares, :across_ans_id
    add_index :squares, :down_ans_id
  end
end
