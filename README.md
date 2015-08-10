# The Cruciverbalist

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
The Cruciverbalist is a site for crossword puzzle creators and enthusiasts. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create puzzle grids of different sizes
- [ ] Create puzzle answers
- [ ] Create clues associated with an answer
- [ ] Create rebus puzzles
- [ ] Save puzzles
- [ ] Save drafts of a puzzle
- [ ] Post finish puzzles for other users to review
- [ ] Comment on other users' puzzles
- [ ] Solve other users' puzzles
- [ ] Tag puzzles with keywords / difficulty
- [ ] Search for puzzles by title / user
- [ ] Search for puzzles by tag

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication & Profiles (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create accounts and sign in and out of the site. Users will also have public profiles and home pages created with the Backbone app.

[Details][phase-one]

### Phase 2: Puzzles, Clues, Answers (~3 days)
In this phase, I am going to make Rails models for my clues, puzzles, and answers. I will build associations between the models. I will make a Backbone app and api controllers for all three of these models. By the end of this phase, users will be able to create new puzzle grids and fill them in with answers. They will also be able to create clues and associate them with answers.

[Details][phase-two]

### Phase 3: Playable Puzzles (~2 days)
In this, phase I am going to build up some functionality to allow users to interact with each other. This will involve adding a few new features to the site. One feature will be allowing users to publish their puzzles - this will essentially mean setting their puzzle to public, which will mean other users can view and solve their puzzle. This phase will also involve making puzzles playable, so users can actually play each others puzzles.

[Details][phase-three]

### Phase 4: Puzzle Feedback (~2 days)
This phase will involve allowing users to comment on each others puzzles. I also want users to be able to rate each other's puzzles - both in terms of difficulty and in terms of quality. I will use SQL to generate public puzzles' average ratings & difficulty. This will involve making two new Backbone models - PuzzleDifficultyRatings and PuzzleQualityRatings.

[Details][phase-four]

### Phase 5: Searching For Puzzles & Users
I'll need to add `search` routes to both the Users and Puzzles controllers. I think there will be a SearchBar subview where users can specify what they are looking for. I will need to add a SearchResults page which lists puzzles by title, including the user, difficulty, and rating.


[Details][phase-five]

### Phase 6: Implement Puzzle Drafts (~2 days)
In this phase, I want to add to functionality allow users to create and save different drafts of puzzle. One puzzle will be able to have multiple drafts associated with it. Drafts will be optional and they can be edited and destroyed.

[Details][phase-six]

### Phase 7: CSS Styling (~2 days)
The last two days I will spend making my site look as good as possible, mainly working with CSS to fix all the styling. I will also use Bootstrap to improve the styling.

[Details][phase-seven]

### Bonus Features (TBD)
- [ ] Follow other users
- [ ] Search for specific clues/answers
- [ ] Check if a word is valid w/ included dictionary
- [ ] Rate other users puzzles
- [ ] Pagination/infinite scroll
- [ ] Activity history
- [ ] Comment on other comments
- [ ] Algorithm that solves puzzles for you
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
