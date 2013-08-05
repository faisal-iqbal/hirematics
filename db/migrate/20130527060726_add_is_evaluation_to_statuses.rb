class AddIsEvaluationToStatuses < ActiveRecord::Migration
  def change
    add_column :candidate_statuses, :is_evaluation, :boolean, :default => 0
  end
end
