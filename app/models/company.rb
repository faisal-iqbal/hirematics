class Company < ActiveRecord::Base
  has_many :users

  validates :package, :presence => true, :numericality => true
  validates :company_name, :presence => true

#  attr_accessible :stripe_card_token

  def save_with_payment
    if valid?
      customer = Stripe::Customer.create(description:email, :plan => package, :card => stripe_card_toke)
      self.stripe_customer_token = customer.id
      save!
    end
  end

end
