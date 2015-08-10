# Schema Information

## quality_rating
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
puzzle_id   | integer   | not null, foreign key (references puzzles)
quality     | integer   | not null, rate between 0-5 stars

## difficulty_rating
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
puzzle_id   | integer   | not null, foreign key (references puzzles)
difficulty  | integer   | not null, rate between 0-10

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
puzzle_id   | integer   | not null, foreign key (references puzzles)
content     | text      | not null

## answer
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
content     | string    | not null
answer_id   | integer   | not null, foreign key (references answer)

## answer
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
content     | string    | not null
puzzle_id   | integer   | not null, foreign key (references puzzle)
grid_pos    | array     | not null, minimum length 3
direction   | string    | not null, either down or across

## puzzles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id     | integer   | not null, foreign key (references user)
empty_grid  | array     | not null
answer_grid | array     | not null
public?     | boolean   | not null, default: false
difficulty  | string    | not null, limit to easy, medium, difficult


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
