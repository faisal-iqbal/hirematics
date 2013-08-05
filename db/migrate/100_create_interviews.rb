class CreateInterviews < ActiveRecord::Migration
  def change
    create_table :interviews do |t|
      t.integer :candidate_id
      t.integer :user_id
      t.integer :user_id_1
      t.datetime :interview_date

      t.timestamps
    end
  end
end
