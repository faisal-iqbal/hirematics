class AddTagsToCandidates < ActiveRecord::Migration
  def change
    add_column :candidates, :tags, :string
  end
end
