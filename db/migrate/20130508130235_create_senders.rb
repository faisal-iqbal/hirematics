class CreateSenders < ActiveRecord::Migration
  def change
    create_table :senders do |t|
      t.string :server
      t.string :username
      t.string :password
      t.string :address
      t.integer :port
      t.string :domain

      t.timestamps
    end
  end
end
