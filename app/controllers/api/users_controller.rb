class Api::UsersController < ApplicationController

  def show
    @user = User.includes(:puzzles).includes(:games).find(current_user.id)
  end


end
