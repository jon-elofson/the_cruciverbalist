class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :grid, null: false
      t.integer :row_no, null: false
      t.integer :col_no, null: false
      t.boolean :private, null: false, default: true
      t.string :difficulty
      t.timestamps null: false
    end
    add_index :puzzles, :author_id
  end
end
