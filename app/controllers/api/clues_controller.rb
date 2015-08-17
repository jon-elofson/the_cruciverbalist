class Api::CluesController < ApplicationController

  def create
    @clue = Clue.new(clue_params)
    @clue.puzzle_id = params[:puzzle][:id]
    @clue.save!
    render json: @clue
  end

  def update
    @clue = Clue.find(params[:id])
    @clue.update(clue_params)
    render json: @clue
  end

  def destroy
    @clue = Clue.find(params[:id])
    @clue.destroy
    render json: @clue
  end

  private

  def clue_params
    params.require(:clue).permit(
      {:start_sq_array => []},
      :puzzle,
      :clue_no,
      :clue_text,
      :direction)
  end

end
