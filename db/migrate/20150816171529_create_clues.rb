class CreateClues < ActiveRecord::Migration
  def change
    create_table :clues do |t|
      t.integer :puzzle_id, null: false
      t.text :clue_text
      t.string :direction, null: false
      t.text :start_sq_array, null: false
      t.timestamps null: false
    end
    add_index :clues, :puzzle_id
  end
end
