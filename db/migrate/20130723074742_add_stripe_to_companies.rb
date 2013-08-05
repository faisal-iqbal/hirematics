class AddStripeToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :stripe_customer_toke, :string
  end
end
