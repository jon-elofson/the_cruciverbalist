class DropAnswers < ActiveRecord::Migration
  def change
    drop_table :answers
    remove_column :squares, :down_ans_id, :integer
    remove_column :squares, :across_ans_id, :integer
  end
end
