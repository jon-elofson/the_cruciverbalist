class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.integer :author, null: false
      t.string :title, null: false
      t.text :empty_grid, null: false
      t.text :answer_grid, null: false
      t.boolean :private, null: false, default: true
      t.string :difficulty
      t.timestamps null: false
    end
    add_index :puzzles, :author
  end
end
