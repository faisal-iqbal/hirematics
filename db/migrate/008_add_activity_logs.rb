class AddActivityLogs < ActiveRecord::Migration
  def self.up
    create_table :activity_logs do |t|
	  t.integer	  :candidate_id
	  t.integer	  :user_id
	  t.string    :log
	  t.timestamps
    end
  end
  
  def self.down
    drop_table :activity_logs
  end
end