class ChangeDataTypeOfExpiryToIntegerInPackages < ActiveRecord::Migration
  def up
    change_column :packages, :expiry, :integer
  end

  def down
  end
end
