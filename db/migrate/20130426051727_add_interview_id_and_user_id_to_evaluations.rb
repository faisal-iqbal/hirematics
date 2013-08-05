class AddInterviewIdAndUserIdToEvaluations < ActiveRecord::Migration
  def change
    add_column :evaluations, :user_id, :integer
    add_column :evaluations, :interview_id, :integer
  end
end
