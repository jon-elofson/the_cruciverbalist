class Api::SquaresController < ApplicationController

  skip_before_action :verify_authenticity_token

  def update
    @square = Square.find(params[:id])
    @square.update_attributes(square_params)
    render :json => @square
  end

  private

  def square_params
    params.require(:square).permit(:value,:blackedout,
    :across_ans_no,:down_ans_no,:across_ans_id,:down_ans_id);
  end


end
