class AddStatusToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :status, :boolean, :default => false
  end
end
