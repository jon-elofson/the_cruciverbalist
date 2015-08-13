json.extract! @puzzle, :id, :title, :difficulty,
              :created_at, :updated_at, :row_no, :col_no

json.squares @puzzle.squares do |square|
  json.id square.id
  json.value square.value
  json.no_str square.no_str
  json.posx square.position_array[0]
  json.posy square.position_array[1]
  json.blackedout square.blackedout
end