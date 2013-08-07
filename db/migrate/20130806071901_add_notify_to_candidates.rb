class AddNotifyToInterview < ActiveRecord::Migration
  def change
    add_column :candidates, :notify, :boolean, :default => false
  end
end
