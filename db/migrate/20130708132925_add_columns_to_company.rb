class AddColumnsToCompany < ActiveRecord::Migration
  def change
    add_column :companies, :user_id, :integer
    add_column :companies, :package, :integer
    add_column :companies, :email, :string
    add_column :companies, :identifier, :string
  end
end
