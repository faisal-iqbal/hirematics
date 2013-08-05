class AddFileToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :evaluation_file_name, :string
    add_column :jobs, :evaluation_content_type, :string
    add_column :jobs, :evaluation_file_size, :integer
  end
end
