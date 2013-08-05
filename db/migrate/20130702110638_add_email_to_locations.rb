class AddEmailToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :email_list, :text
  end
end
