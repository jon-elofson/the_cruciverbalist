# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150814200600) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "puzzle_id",     null: false
    t.string   "answer_string"
    t.string   "direction",     null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "across_ans_no"
    t.integer  "down_ans_no"
  end

  create_table "clues", force: :cascade do |t|
    t.text     "content"
    t.integer  "answer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "clues", ["answer_id"], name: "index_clues_on_answer_id", using: :btree

  create_table "puzzles", force: :cascade do |t|
    t.integer  "author_id",                 null: false
    t.string   "title",                     null: false
    t.integer  "row_no",                    null: false
    t.integer  "col_no",                    null: false
    t.boolean  "private",    default: true, null: false
    t.string   "difficulty"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "puzzles", ["author_id"], name: "index_puzzles_on_author_id", using: :btree

  create_table "squares", force: :cascade do |t|
    t.integer  "puzzle_id",                      null: false
    t.text     "position_array",                 null: false
    t.string   "value"
    t.boolean  "blackedout",     default: false, null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "across_ans_id"
    t.integer  "down_ans_id"
    t.integer  "down_ans_no"
    t.integer  "across_ans_no"
  end

  add_index "squares", ["across_ans_id"], name: "index_squares_on_across_ans_id", using: :btree
  add_index "squares", ["down_ans_id"], name: "index_squares_on_down_ans_id", using: :btree
  add_index "squares", ["puzzle_id"], name: "index_squares_on_puzzle_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
