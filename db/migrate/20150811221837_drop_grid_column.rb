class DropGridColumn < ActiveRecord::Migration
  def change
    remove_column :puzzles, :grid
  end
end
