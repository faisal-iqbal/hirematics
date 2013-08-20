class ChangeDataTypeOfExpiryToIntegerInPackages < ActiveRecord::Migration
  def change
    change_column :packages, :expiry, :integer
  end
end
