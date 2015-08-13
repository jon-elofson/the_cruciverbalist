class UpdateAnswersTable < ActiveRecord::Migration
  def change
    remove_column :answers, :down_ans_id
    remove_column :answers, :across_ans_id
    add_column :answers, :across_ans_no, :integer
    add_column :answers, :down_ans_no, :integer
  end
end
