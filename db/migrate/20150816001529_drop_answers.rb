class DropAnswers < ActiveRecord::Migration
  def change
    remove_column :squares, :down_ans_id, :integer
    remove_column :squares, :across_ans_id, :integer
  end
end
