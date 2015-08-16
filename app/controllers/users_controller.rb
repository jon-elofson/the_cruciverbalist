class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash[:error] = @user.errors.full_messages
      redirect_to new_session_url
    end
  end

  def user_params
    params.require(:user).permit(:username,:password,:email)
  end

end
