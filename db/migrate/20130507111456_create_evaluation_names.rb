class CreateEvaluationNames < ActiveRecord::Migration
  def change
    create_table :evaluation_names do |t|
      t.string :name

      t.timestamps
    end
  end
end
