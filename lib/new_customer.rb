class NewCustomer < Struct.new(:company_id, :token)
  def perform
    logger.debug "=============================================================#{Time.now}"
    @company = Company.find(:company_id)
    customer = Stripe::Customer.create(:description => @company.email, :plan => @company.package, :card => :token)
    @company.stripe_customer_toke = customer.id
    #    mailing = Mailing.find(mailing_id)
    #    mailing.deliver
  end
end

