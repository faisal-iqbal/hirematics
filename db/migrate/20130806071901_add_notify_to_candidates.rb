class AddNotifyToCandidates < ActiveRecord::Migration
  def change
    add_column :candidates, :notify, :boolean, :default => false
  end
end
