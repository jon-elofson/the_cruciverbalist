class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id, null: false
      t.integer :puzzle_id, null: false
      t.text :game_grid, null: false
      t.timestamps null: false
    end
    add_index :games, :user_id
    add_index :games, :puzzle_id
  end
end
