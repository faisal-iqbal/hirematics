class AddEvaluationTypeToEvaluation < ActiveRecord::Migration
  def change
    add_column :evaluations, :evaluation_type, :string
  end
end
