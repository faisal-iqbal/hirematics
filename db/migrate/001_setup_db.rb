class SetupDb < ActiveRecord::Migration
  def self.up
    create_table :jobs do |t|
      t.integer	:department_id
      t.integer	:location_id
      t.integer	:category_id
      t.string	:title
      t.string	:salary_range
      t.text  	:description
      t.boolean	:send_email_to_creator
      t.boolean	:resume_is_mandatory
      t.boolean	:apply_from_linnedin
      t.integer	:status, :default => 0
      t.timestamps
    end
    create_table :questions do |t|
      t.integer	:job_id
      t.string	:name
      t.string	:type
    end
    create_table :departments do |t|
      t.string	:name
    end
    create_table :locations do |t|
      t.string	:country
      t.string	:address1
      t.string	:address2
      t.string	:city
      t.string	:zip
    end
    create_table :categories do |t|
      t.string	:name
      t.integer	:parent
    end
    create_table :candidates do |t|
      t.integer           :job_id
      t.string            :first_name
      t.string            :last_name
      t.string            :email
      t.string            :phone
      t.has_attached_file :resume
      t.text              :evaluation
      t.integer           :rating, :default => 0
      t.integer           :candidate_status_id, :default => 0
      t.timestamps
    end
    create_table :candidate_statuses do |t|
      t.string	:name
      t.string	:value
    end
  end
  
  def self.down
    drop_table :jobs
    drop_table :questions
    drop_table :departments
    drop_table :locations
    drop_table :categories
    drop_table :candidates
    drop_table :candidate_statuses
  end
end