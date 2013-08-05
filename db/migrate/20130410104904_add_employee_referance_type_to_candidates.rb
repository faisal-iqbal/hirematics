class AddEmployeeReferanceTypeToCandidates < ActiveRecord::Migration
  def change
    add_column :candidates, :employee_reference, :string
  end
end
