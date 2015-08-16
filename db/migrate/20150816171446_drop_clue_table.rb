class DropClueTable < ActiveRecord::Migration
  def change
    drop_table :clues
  end
end
