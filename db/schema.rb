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

ActiveRecord::Schema.define(version: 2021_01_27_182137) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "products", force: :cascade do |t|
    t.integer "order_id"
    t.integer "order_number"
    t.datetime "order_created"
    t.integer "total"
    t.string "billing_address_first_name"
    t.string "billing_address_last_name"
    t.uuid "customer_ip"
    t.string "referring_site"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
