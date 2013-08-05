class CreatePackages < ActiveRecord::Migration
  def change
    create_table :packages do |t|
      t.string :name
      t.decimal :charges
      t.datetime :expiry
      t.integer :level
      t.integer :allowed_open_jobs

      t.timestamps
    end
  end
end
