class StaticPagesController < ApplicationController

  before_action :ensure_logged_in

  def root
  end

  private

  def ensure_logged_in
    return if logged_in?
    redirect_to new_session_url
  end

end
