class UpdateScoreToFloatInEvaluation < ActiveRecord::Migration
  def up
    change_column :evaluations, :score, :float
  end

  def down
  end
end
