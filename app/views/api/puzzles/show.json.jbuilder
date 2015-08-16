json.extract! @puzzle, :id, :title, :difficulty,
              :created_at, :updated_at, :private, :row_no, :col_no

json.squares @puzzle.squares do |square|
  json.id square.id
  json.down_ans_id square.down_ans_id
  json.across_ans_id square.across_ans_id
  json.value square.value
  json.no_str square.no_str
  json.across_ans_no square.across_ans_no
  json.down_ans_no square.down_ans_no
  json.posx square.position_array[0]
  json.posy square.position_array[1]
  json.blackedout square.blackedout
end
