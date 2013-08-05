class AddNotifyToInterview < ActiveRecord::Migration
  def change
    add_column :interviews, :notify, :boolean, :default => true
  end
end
