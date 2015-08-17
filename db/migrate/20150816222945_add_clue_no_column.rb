class AddClueNoColumn < ActiveRecord::Migration
  def change
    add_column :clues, :clue_no, :integer, null: false
  end
end
