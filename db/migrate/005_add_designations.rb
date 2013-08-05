class AddDesignations < ActiveRecord::Migration
  def self.up
    create_table :designations do |t|
	  t.string    :title
	  t.timestamps
    end
  end
  
  def self.down
    drop_table :designations
  end
end