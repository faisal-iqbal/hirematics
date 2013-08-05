class AddCompanyIdToAllTheTables < ActiveRecord::Migration
  def change
    tables = ActiveRecord::Base.connection.tables - ["schema_migrations", "companies"]
    tables.each do |table|
      add_column table, :company_id, :integer
    end
  end
end