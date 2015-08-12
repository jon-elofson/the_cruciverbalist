class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.integer :puzzle_id, null: false
      t.text :position_array, null: false
      t.string :value
      t.boolean :blackedout, null: false, default: false
      t.integer :down_ans_no
      t.integer :across_ans_no
      t.timestamps null: false
    end
    add_index :squares, :puzzle_id
  end
end
