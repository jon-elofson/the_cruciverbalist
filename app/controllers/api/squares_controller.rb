class Api::SquaresController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
  end

  def show
    @square = Square.find(params[:id])
    render :json => @square
  end

  def edit
  end

  def update
  end

  private

  def square_params
    params.require(:puzzle).permit(:value,:blackedout?)
  end

  def current_puzzle

  end

end
