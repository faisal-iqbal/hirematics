class AddTypeToInterview < ActiveRecord::Migration
  def change
    add_column :interviews, :type, :string
  end
end
