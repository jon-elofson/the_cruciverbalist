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

json.answers @puzzle.answers do |answer|
  json.id answer.id
  json.answer_str answer.answer_string
  json.direction answer.direction
  json.down_ans_no answer.down_ans_no
  json.across_ans_no answer.across_ans_no
end
