class AddShowInStatusToStatuses < ActiveRecord::Migration
  def change
    add_column :candidate_statuses, :show_in_statuses, :boolean, :default => 0
  end
end
