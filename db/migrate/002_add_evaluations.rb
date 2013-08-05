class AddEvaluations < ActiveRecord::Migration
  def self.up
    create_table :evaluations do |t|
	  t.integer :candidate_id
	  t.text    :content
	  t.timestamps
    end
  end
  
  def self.down
    drop_table :evaluations
  end
end