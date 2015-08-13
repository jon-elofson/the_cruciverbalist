class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :puzzle_id, null: false
      t.string :answer_string
      t.integer :across_ans_no;
      t.integer :down_ans_no;
      t.text :square_pos_array, null: false
      t.string :direction, null: false
      t.timestamps null: false
    end
  end
end
