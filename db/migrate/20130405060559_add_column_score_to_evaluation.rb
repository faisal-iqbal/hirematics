class AddColumnScoreToEvaluation < ActiveRecord::Migration
  def change
    add_column :evaluations, :score, :integer
  end
end
