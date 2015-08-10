# Phase 2: Viewing Blogs and Posts

## Rails
### Models
Puzzle
Answer
Clue

### Controllers
Api::PuzzleController (create, destroy, index, show)
Api::AnswerController (create, destroy, show, update)
Api::ClueController (create,destroy,show,update)

### Views
* puzzle/show.json.jbuilder

## Backbone
### Models
* Puzzle (parses nested `answers` association)
* Answer (parse nested `clue` association)
* Clue

### Collections
* Puzzles
* Answers
* Clues

### Views
* PuzzleForm (title, grid size, difficulty)
* PuzzleShow (composite view, contains CluesIndex  subview)
* CluesIndex (composite view, contains ClueIndexItem subviews)
* ClueIndexItem


## Gems/Libraries
