class AddFileToEvaluations < ActiveRecord::Migration
  def self.up
	add_column :evaluations, :document_file_name, :string
    add_column :evaluations, :document_content_type, :string
    add_column :evaluations, :document_file_size, :integer
  end

  def self.down
    remove_column :evaluations, :document_file_name
	remove_column :evaluations, :document_content_type
	remove_column :evaluations, :document_file_size
  end
end