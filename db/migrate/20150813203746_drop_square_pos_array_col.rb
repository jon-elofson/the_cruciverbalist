class DropSquarePosArrayCol < ActiveRecord::Migration
  def change
    remove_column :answers, :square_pos_array
  end
end
