class AddFieldsToCandidate < ActiveRecord::Migration
  def self.up
	add_column :candidates, :assigned_to, :integer
	add_column :candidates, :referral, :integer
  end

  def self.down
    remove_column :candidates, :assigned_to
	remove_column :candidates, :referral
  end
end