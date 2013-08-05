class AddLocationToInterview < ActiveRecord::Migration
  def change
    add_column :interviews, :location_id, :integer
  end
end
