class AddCheckerToEvaluation < ActiveRecord::Migration
  def change
    add_column :evaluations, :checker_id, :integer
  end
end
