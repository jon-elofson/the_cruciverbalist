class CreateClues < ActiveRecord::Migration
  def change
    create_table :clues do |t|
      t.text :content
      t.integer :answer_id
      t.timestamps null: false
    end
    add_index :clues, :answer_id
  end
end
