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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130723074742) do

  create_table "activity_logs", :force => true do |t|
    t.integer  "candidate_id"
    t.integer  "user_id"
    t.string   "log"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "authentications", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "candidate_statuses", :force => true do |t|
    t.string  "name"
    t.string  "value"
    t.boolean "is_evaluation",    :default => false
    t.boolean "show_in_statuses", :default => false
    t.integer "company_id"
  end

  create_table "candidates", :force => true do |t|
    t.integer  "job_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone"
    t.string   "resume_file_name"
    t.string   "resume_content_type"
    t.integer  "resume_file_size"
    t.datetime "resume_updated_at"
    t.text     "evaluation"
    t.integer  "rating"
    t.integer  "candidate_status_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "assigned_to"
    t.integer  "referral"
    t.string   "tags"
    t.string   "source"
    t.string   "employee_reference"
    t.boolean  "notify"
    t.boolean  "new_resume",          :default => true
    t.integer  "company_id"
  end

  create_table "candidates_tags", :force => true do |t|
    t.integer  "candidate_id"
    t.integer  "tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "categories", :force => true do |t|
    t.string  "name"
    t.integer "parent"
    t.integer "company_id"
  end

  create_table "companies", :force => true do |t|
    t.string   "company_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "package"
    t.string   "email"
    t.string   "identifier"
    t.boolean  "status",               :default => false
    t.string   "stripe_customer_toke"
  end

  create_table "departments", :force => true do |t|
    t.string  "name"
    t.integer "company_id"
  end

  create_table "designations", :force => true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "emails", :force => true do |t|
    t.string   "do_action"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "subject"
    t.integer  "company_id"
  end

  create_table "evaluation_names", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "evaluations", :force => true do |t|
    t.integer  "candidate_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "document_file_name"
    t.string   "document_content_type"
    t.integer  "document_file_size"
    t.float    "score"
    t.string   "evaluation_type"
    t.integer  "user_id"
    t.integer  "interview_id"
    t.integer  "checker_id"
    t.integer  "assign_to"
    t.integer  "company_id"
  end

# Could not dump table "interviews" because of following StandardError
#   Unknown type 'varhcar(255)' for column 'interview_type'

  create_table "jobs", :force => true do |t|
    t.integer  "department_id"
    t.integer  "location_id"
    t.integer  "category_id"
    t.string   "title"
    t.string   "salary_range"
    t.text     "description"
    t.boolean  "send_email_to_creator"
    t.boolean  "resume_is_mandatory"
    t.boolean  "apply_from_linnedin"
    t.integer  "status",                  :default => 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "evaluation_file_name"
    t.string   "evaluation_content_type"
    t.integer  "evaluation_file_size"
    t.integer  "company_id"
  end

  create_table "locations", :force => true do |t|
    t.string  "country"
    t.string  "address1"
    t.string  "address2"
    t.string  "city"
    t.string  "zip"
    t.text    "map_url"
    t.integer "company_id"
    t.text    "email_list"
  end

  create_table "packages", :force => true do |t|
    t.string   "name"
    t.decimal  "charges"
    t.datetime "expiry"
    t.integer  "level"
    t.integer  "allowed_open_jobs"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", :force => true do |t|
    t.integer "job_id"
    t.string  "name"
    t.string  "type"
    t.integer "company_id"
  end

  create_table "senders", :force => true do |t|
    t.string   "server"
    t.string   "username"
    t.string   "password"
    t.string   "address"
    t.integer  "port"
    t.string   "domain"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "sources", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "tags", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                 :default => "",    :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "",    :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                                 :default => false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.integer  "designation_id"
    t.string   "company_id"
    t.boolean  "super_admin",                           :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
