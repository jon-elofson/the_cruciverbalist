json.extract! @user, :username, :email

json.puzzles @user.puzzles do |puzzle|
  json.id puzzle.id
  json.title puzzle.title
  json.created_at puzzle.created_at
  json.updated_at puzzle.updated_at
  json.private puzzle.private
  json.row_no puzzle.row_no
  json.col_no puzzle.col_no
end

json.games @user.games do |game|
  json.id game.id
  json.user_id game.user_id
  json.puzzle_id game.puzzle_id
  json.game_grid game.game_grid
  json.seconds game.seconds
end
