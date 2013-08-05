class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :do_action
      t.text :body

      t.timestamps
    end
  end
end
