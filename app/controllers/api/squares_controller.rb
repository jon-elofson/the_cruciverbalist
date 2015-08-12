class Api::SquaresController < ApplicationController

  skip_before_action :verify_authenticity_token

  def show
    @square = Square.find(params[:id])
    render :json => @square
  end

  def index
    @squares = Square.all
    render :json => @squares
  end

  def edit
  end

  def update
  end

  private

  def square_params
    params.require(:puzzle).permit(:value,:blackedout?)
  end

end
