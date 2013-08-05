class AddNewResumeToCandidate < ActiveRecord::Migration
  def change
    add_column :candidates, :new_resume, :boolean, :default => true
  end
end
