class AddAssigntoToEvaluation < ActiveRecord::Migration
  def change 
    add_column :evaluations, :assign_to, :integer
  end
end
